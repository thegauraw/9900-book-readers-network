import json
import requests

from flask import Blueprint, request
from flask_restful import Resource
from bookrs.model.bookModel import book_details_schema, BookModel
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import InternalServerError, InvalidSearchException

search_bp = Blueprint('search', __name__)


class SearchForBooks(Resource):
  def get(self):

    query_string = request.args.get('q') if request.args.get('q') else None
    # search_method = request.args.get('by') if request.args.get('by') else None
    # page = request.args.get('p') if request.args.get('p') else None
    startIndex = request.args.get('startIndex') if request.args.get('startIndex') else 0
    rating = request.args.get('rating') if request.args.get('rating') else None #for advanced filter

    #Search for google book api
    # For each result, add book detail to the response
    # book = BookModel.query.filter_by(volume_id=volume_id).first()
    # book_data_dump = book_details_schema.dump(book)

    try:
      # search books with google api
      url = f'https://www.googleapis.com/books/v1/volumes?q={query_string}&startIndex={startIndex}'
      resp = requests.get(url)

      if resp.status_code == 200:
        data = json.loads(resp.text)
        return SUCCESS(payload=data)
      else:
        InvalidSearchException()
    except:
      raise InternalServerError()


class SearchBookDetail(Resource):
  def get(self, volume_id):
    try:

      # search book detail with google api
      # add the google result (authors, title, categories, image, etc.) to details
      url = f'https://www.googleapis.com/books/v1/volumes/{volume_id}'
      resp = requests.get(url)

      # book = BookModel.query.filter_by(volume_id=volume_id).first()
      # book_data_dump = book_details_schema.dump(book)
      # response = {"book_details": book_data_dump, "recommended_books":[]}
      if resp.status_code == 200:
        data = json.loads(resp.text)
        return SUCCESS(payload=data)
      else:
        InvalidSearchException()
    except:
      raise InternalServerError()


api.add_resource(SearchForBooks, '/search')
api.add_resource(SearchBookDetail, '/search/<string:volume_id>')
