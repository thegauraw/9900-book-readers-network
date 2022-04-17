from flask import Blueprint, request
from flask_restful import Resource

from bookrs.model.bookModel import BookModel
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.services.filters import filterBooksWithRating
from bookrs.third_party.googleAPIs import seach_books_from_google, seach_book_detail_from_google

search_bp = Blueprint('search', __name__)


class SearchForBooks(Resource):

  def get(self):
    """
      search and filter books `GET /search?q=<string: q>&startIndex=<int: startIndex>&minRating=<float: minRating>`
    """

    query_string = request.args.get('q') if request.args.get('q') else None
    # search_method = request.args.get('by') if request.args.get('by') else None
    # page = request.args.get('p') if request.args.get('p') else None
    startIndex = request.args.get('startIndex') if request.args.get('startIndex') else 0
    minRating = float(request.args.get('minRating')) if request.args.get('minRating') else 0.0 #for advanced filter

    # Search for google book api
    # For each result, add book detail to the response

    try:
      # search books with google api
      data = seach_books_from_google(query_string=query_string, startIndex=startIndex)
      filtered_data = filterBooksWithRating(minRating=minRating, data=data)

      return SUCCESS(payload=filtered_data)
    except Exception as e:
      raise e

class SearchBookDetail(Resource):
  def get(self, volume_id):
    try:
      # add the google result (authors, title, categories, image, etc.) to details
      book_data = seach_book_detail_from_google(volume_id)
      book = BookModel.query.filter_by(volume_id=volume_id).first()

      if book:
        book_data['average_rating'] = book.average_rating
      else:
        book_data['average_rating'] = 0.0

      return SUCCESS(payload=book_data)
    except Exception as e:
      raise e


api.add_resource(SearchForBooks, '/search')
api.add_resource(SearchBookDetail, '/search/<string:volume_id>')