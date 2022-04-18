from flask import Blueprint, abort, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.model.bookModel import BookModel, Collectedbooks, book_details_schema, books_details_schema, collected_book_schema, collected_books_schema
from bookrs.model.collection import Collection
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookCollectException, BookCreateException, BookDropException
from bookrs.third_party.googleAPIs import get_book_details_from_google
from datetime import datetime

books_bp = Blueprint('books', __name__)

class CollectedBooks(Resource):
  decorators = [jwt_required()]

  def get(self, collection_id):
    """
    List books in a collection
    `GET /collections/:collection_id/books`
    """
    try:
      collection = Collection.query.filter_by(id=collection_id).first_or_404()
      books_data_dump = books_details_schema.dump(collection.books)
      return SUCCESS(payload=books_data_dump)
    except Exception as e:
      raise e

  def post(self, collection_id):
    # check if the user owns the collection
    current_user = get_jwt_identity()
    collection = Collection.get_by_reader_and_id(reader_id=current_user, id=collection_id)

    data = request.get_json()
    volume_id = data.get('volume_id')
    book = BookModel.query.filter_by(volume_id=volume_id).first()
    # create book if it doesn't already exist in the system
    if book is None:
      book_data = get_book_details_from_google(volume_id)
      book = book_details_schema.load(book_data)
      if not book.save():
        raise BookCreateException()

    # collection.books.append(book)
    # if collection.update():
      # TODO: add record to book_readings as well
      # show list of books in the collection - just like get
    books_data_dump = books_details_schema.dump(collection.books)
    collected_data = Collectedbooks.query.filter_by(collection_id=collection_id, book_id=book.id).first()
    if collected_data:
      raise BookCollectException()
    collected_book = {"collection_id": collection_id,
                      "book_id": book.id,
                      "collected_date": datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    if collected_book_schema.load(collected_book).create():
      return SUCCESS(message='Book added to the collection successfully', payload=books_data_dump)
    else:
      raise BookCollectException()


class CollectedBook(Resource):
  decorators = [jwt_required()]

  def delete(self, collection_id, volume_id):
    """
    Remove book form a collection
    `DELETE /collections/:collection_id/books/:volume_id`
    """
    # check if the user owns the collection
    current_user = get_jwt_identity()
    collection = Collection.get_by_reader_and_id(reader_id=current_user, id=collection_id)
    book = BookModel.query.filter_by(volume_id=volume_id).first()
    if book in collection.books:
      # collection.books.remove(book)
      collected_data = Collectedbooks.query.filter_by(collection_id=collection_id, book_id=book.id).first()
      # if collection.update(): # db-commit
      if collected_data.delete(): # db-commit
        return SUCCESS(message='Book removed from the collection successfully')
      else:
        raise BookDropException()
    else:
      abort(404)

api.add_resource(CollectedBooks, '/collections/<int:collection_id>/books')
api.add_resource(CollectedBook, '/collections/<int:collection_id>/books/<string:volume_id>')
