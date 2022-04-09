from flask import Blueprint, abort, jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.model.book import Book, book_schema, books_schema
from bookrs.model.collection import Collection
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookCollectException, BookCreateException, BookDropException, BookNotFoundException, CollectionNotFoundException


books_bp = Blueprint('books', __name__)


class Events(Resource):
  decorators = [jwt_required()]

  def post(self):
    """
    create new book record
    `POST /books`
    {
        "title": "Book Conners",
        "description": "day day up is a good team",
        "date_of_event": "2022-12-26",
        "registration_open_until": "2022-12-25",
        "venue": "UNSW Law Library"
        "org_user_id": 1,
        "book_id_related_to_event": 1
    }
    if the book record does not exist in the system,
      this operation id performed before adding a book to collection
    """
    data = request.get_json()
    event = Event_schema.load(data)
    if book.save():
      book_data_dump = book_schema.dump(book)
      return SUCCESS(message='Book created successfully', status_code=201, payload=book_data_dump)
    else:
      raise BookCreateException()
########################################################################
########################################################################
########################################################################

class BookId(Resource):
  decorators = [jwt_required()]

  def get(self, book_id):
    """view book info `GET /books/<int:book_id>` """

    # anyone can view the book record
    book = Book.get_by_id(book_id)
    book_data_dump = book_schema.dump(book)
    return SUCCESS(payload=book_data_dump)


class CollectedBooks(Resource):
  decorators = [jwt_required()]

  def get(self, collection_id):
    """
    List books in a collection
    `GET /collections/:collection_id/books`
    """
    collection = Collection.get_by_id(collection_id)

    books_data_dump = books_schema.dump(collection.books)
    return SUCCESS(payload=books_data_dump)

  def post(self, collection_id):
    """
    Add book to the collection
    `POST /collections/:collection_id/books`
    {
        "title": "Book Baa",
        "authors": "Author Aaa",
        "publisher": "Publisher Paa",
        "publication_date": "2022-03-27",
        "category": "Category Caa"
    }
    OR,
    {"book_id": "1"}
    """
    # check if the user owns the collection
    current_user = get_jwt_identity()
    collection = Collection.get_by_reader_and_id(reader_id=current_user, id=collection_id)

    data = request.get_json()
    book = Book.query.get(data.get('book_id'))

    # create book if it doesn't already exist in the system
    if book is None:
      book = book_schema.load(data)
      if not book.save():
        raise BookCreateException()

    collection.books.append(book)
    if collection.update():
      # TODO: add record to book_readings as well
      # show list of books in the collection - just like get
      books_data_dump = books_schema.dump(collection.books)
      return SUCCESS(message='Book added to the collection successfully', payload=books_data_dump)
    else:
      raise BookCollectException()


class CollectedBook(Resource):
  decorators = [jwt_required()]

  def delete(self, collection_id, book_id):
    """
    Remove book form a collection
    `DELETE /collections/:collection_id/books/:book_id`
    """
    # check if the user owns the collection
    current_user = get_jwt_identity()
    collection = Collection.get_by_reader_and_id(reader_id=current_user, id=collection_id)

    book = Book.get_by_id(book_id)

    if book in collection.books:
      collection.books.remove(book)
      if collection.update(): # db-commit
        return SUCCESS(message='Book removed from the collection successfully')
      else:
        raise BookDropException()
    else:
      abort(404)


api.add_resource(Books, '/books')
api.add_resource(BookId, '/books/<int:book_id>')
api.add_resource(CollectedBooks, '/collections/<int:collection_id>/books')
api.add_resource(CollectedBook, '/collections/<int:collection_id>/books/<int:book_id>')
