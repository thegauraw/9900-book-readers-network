import copy

from flask import Blueprint, request
from flask_restful import Resource

from bookrs.model.readerModel import ReaderModel, readers_schema, reader_creating_schema, reader_schema
from bookrs.model.bookModel import BookModel, Collectedbooks, book_details_schema, collected_book_schema, collected_books_schema
from bookrs.model.collection import Collection, collection_schema
from bookrs.resources import api
from bookrs.utils.exceptions import NullRegisterFieldException, CollectionCreateException
from bookrs.utils.common import SUCCESS
from bookrs.model.collection import collection_schema
from sqlalchemy import desc

readers_bp = Blueprint('readers', __name__)


class Readers(Resource):

    def get(self):
        readers = ReaderModel.query.all()
        return readers_schema.dump(readers)

    def post(self):
        data = request.get_json()

        if len(data.get('username')) == 0 or len(data.get('email')) == 0 or len(data.get('password')) == 0:
            raise NullRegisterFieldException()

        reader = reader_creating_schema.load(data)
        result = reader_creating_schema.dump(reader.create())

        collection_dict = dict()
        collection_dict['reader_id'] = result.get('id')
        collection_dict['title'] = "main"
        collection_dict['description'] = "main collection"

        """Create default collection""" 
        collection = collection_schema.load(collection_dict)

        if not collection.save():
            raise CollectionCreateException()

        collection_data_dump = collection_schema.dump(collection)
        result['collection'] = collection_data_dump

        return SUCCESS(payload=result, status_code=201)


class RecentReaders(Resource):
    def get(self, volume_id):
        book_data = BookModel.query.filter_by(volume_id=volume_id).first()
        book = book_details_schema.dump(book_data)
        collected_data = Collectedbooks.query.filter_by(book_id=book.get("id")).order_by(desc("collected_date")).limit(10).all()
        collected_list = collected_books_schema.dump(collected_data)
        res_list = []
        for reading in collected_list:
            collection = Collection.query.filter_by(id=reading.get("collection_id")).first()
            reader_id = collection_schema.dump(collection).get("reader_id")
            reader = ReaderModel.query.filter_by(id=reader_id).first()
            user_name = reader_schema.dump(reader).get("username")
            reader_data = {"reader_id": reader_id,
                           "user_name": user_name}
            res_list.append(reader_data)
        return SUCCESS(payload=res_list)


api.add_resource(Readers, '/readers')
api.add_resource(RecentReaders, '/recentreaders/<string:volume_id>')
