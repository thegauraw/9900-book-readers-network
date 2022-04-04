from flask import Blueprint, request
from flask_restful import Resource

from bookrs.model.readerModel import ReaderModel, readers_schema, reader_creating_schema
from bookrs.resources import api
from bookrs.utils.exceptions import NullRegisterFieldException, CollectionCreateException
from bookrs.utils.common import SUCCESS
from bookrs.model.collection import collection_schema

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
        collection_dict['title'] = ""
        collection_dict['description'] = ""

        """Create default collection""" 
        collection = collection_schema.load(collection_dict)

        if not collection.save():
            raise CollectionCreateException()

        collection_data_dump = collection_schema.dump(collection)
        result['collection'] = collection_data_dump

        return SUCCESS(payload=result, status_code=201)


api.add_resource(Readers, '/readers', endpoint='reader')
