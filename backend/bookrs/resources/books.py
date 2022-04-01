from flask import Blueprint, abort, jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.model.book import Book, book_schema, books_schema
from bookrs.model.collection import Collection
from bookrs.resources import api

books_bp = Blueprint('books', __name__)

@books_bp.app_errorhandler(404)
def resource_not_found(err):
  return make_response(jsonify({
      'status': 'error',
      'message': 'Book not found',
  }), 404)


class Books(Resource):
  decorators = [jwt_required()]

  def post(self):
    """
    create new book record
    `POST /books`
    {
        "title": "Book Baa",
        "authors": "Author Aaa",
        "publisher": "Publisher Paa",
        "publication_date": "2022-03-27",
        "category": "Category Caa"
    }
    if the book record does not exist in the system,
      this operation id performed before adding a book to collection
    """
    data = request.get_json()
    book = book_schema.load(data)
    book.save()
    book_data_dump = book_schema.dump(book)
    return make_response(jsonify({
        'status': 'success',
        'message': 'Book created successfully',
        'data': book_data_dump,
    }), 201)


class BookId(Resource):
  decorators = [jwt_required()]

  def get(self, book_id):
    """view book info `GET /books/<int:book_id>` """

    # anyone can view the book record
    book = Book.query.get_or_404(book_id)
    book_data_dump = book_schema.dump(book)
    return make_response(jsonify({
        'status': 'success',
        'message': 'Book returned successfully',
        'data': book_data_dump,
    }), 200)


class CollectedBooks(Resource):
  decorators = [jwt_required()]

  def get(self, collection_id):
    """
    List books in a collection
    `GET /collections/:collection_id/books`
    """
    collection = Collection.query.get_or_404(collection_id)
    books_data_dump = books_schema.dump(collection.books)
    return make_response(jsonify({
        'status': 'success',
        'message': 'Books in the collection listed successfully',
        'data': books_data_dump,
    }), 200)

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
    collection = Collection.query.filter_by(reader_id=current_user, id=collection_id).first_or_404()
    data = request.get_json()
    book = Book.query.filter_by(id = data.get('book_id')).first()
    if book is None:
      book = book_schema.load(data)
      book.save()

    collection.books.append(book)
    collection.update()
    # TODO: add record to book_readings as well

    # show list of books in the collection - just like get
    books_data_dump = books_schema.dump(collection.books)
    return make_response(jsonify({
        'status': 'success',
        'message': 'Book added to the collection successfully',
        'data': books_data_dump,
    }), 200)


class CollectedBook(Resource):
  decorators = [jwt_required()]

  def delete(self, collection_id, book_id):
    """
    Remove book form a collection
    `DELETE /collections/:collection_id/books/:book_id`
    """
    # check if the user owns the collection
    current_user = get_jwt_identity()
    collection = Collection.query.filter_by(reader_id=current_user, id=collection_id).first_or_404()
    book = Book.query.get_or_404(book_id)

    if book in collection.books:
      collection.books.remove(book)
      status = collection.update() # db-commit
      if status:
        return make_response(jsonify({
            'status': 'success',
            'message': 'Book removed from the collection successfully',
        }), 200)
      else:
        return make_response(jsonify({
            'status': 'error',
            'message': 'Could not remove book from the collection'
        }), 500)
    else:
      abort(404)


api.add_resource(Books, '/books')
api.add_resource(BookId, '/books/<int:book_id>')
api.add_resource(CollectedBooks, '/collections/<int:collection_id>/books')
api.add_resource(CollectedBook, '/collections/<int:collection_id>/books/<int:book_id>')
