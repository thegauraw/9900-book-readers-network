from flask import Blueprint, request
from flask_restful import Resource
from bookrs.model.bookModel import book_details_schema, BookModel
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import InternalServerError

search_bp = Blueprint('search', __name__)


class SearchForBooks(Resource):
  def get(self):
    
    data = request.get_json()
    if data:
      query_string = data['q']
      search_method = data['by']
      page = data['p']
      rating = data['rating'] #for advanced filter
    
    #Search for google book api
    ## For each result, add book detail to the response
    ## book = BookModel.query.filter_by(volume_id=volume_id).first()
    ## book_data_dump = book_details_schema.dump(book)
    return SUCCESS(payload=[])


class SearchBookDetail(Resource):
  def get(self, volume_id):
    try:
      # https://www.googleapis.com/books/v1/volumes/volume_id
      # add the google result (authors, title, categories, image, etc.) to details  
      book = BookModel.query.filter_by(volume_id=volume_id).first()
      book_data_dump = book_details_schema.dump(book)
      response = {"book_details": book_data_dump, "recommended_books":[]}
      return SUCCESS(payload=response)
    except:
      raise InternalServerError()


api.add_resource(SearchForBooks, '/search')
api.add_resource(SearchBookDetail, '/search/<string:volume_id>')
