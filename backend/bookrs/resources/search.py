import copy
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
    minRating = float(request.args.get('minRating')) if request.args.get('rating') else 0.0 #for advanced filter

    # Search for google book api
    # For each result, add book detail to the response

    try:
      # search books with google api
      url = f'https://www.googleapis.com/books/v1/volumes?q={query_string}&startIndex={startIndex}&maxResults=40'
      resp = requests.get(url)

      if resp.status_code == 200:
        data = json.loads(resp.text)
        #Google book api may return 200 with 0 totalItems / no items / empty items[]
        if int(data.get('totalItems')) > 0 and data.get('items') and len(data.get('items')) > 0:
          filtered_data = filterBooksWithRating(minRating=minRating, data=data)

          return SUCCESS(payload=filtered_data)

      raise InvalidSearchException()
    except Exception as e:
      raise e

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
        raise InvalidSearchException()
    except Exception as e:
      raise e


api.add_resource(SearchForBooks, '/search')
api.add_resource(SearchBookDetail, '/search/<string:volume_id>')


def retriveBooks(minRating=0., book_data=None):
  books = BookModel.query.filter(BookModel.average_rating >= minRating).all()

  books_list = []
  volume_id_list = []
  for book in books:
    data = copy.deepcopy(book_data)
    if book.title:
      data['volumeInfo']['title'] = book.title
    if book.authors:
      data['volumeInfo']['authors'] = json.loads(book.authors)
    if book.smallThumbnail:
      data['volumeInfo']['imageLinks']['smallThumbnail'] = book.smallThumbnail
    if book.categories:
      data['volumeInfo']['title'] = json.loads(book.categories)
    if book.publisher:
      data['volumeInfo']['title'] = book.publisher
    if book.publishedDate:
      data['volumeInfo']['title'] = book.publishedDate
    if book.average_rating:
      data['average_rating'] = book.average_rating
    else:
      data['average_rating'] = 0.0
    
    volume_id_list.append(book.volume_id)
    
    books_list.append(data)

  return books_list, volume_id_list

def filterBooksWithRating(minRating=0., data=None):
  books_list, volume_id_list = retriveBooks(minRating=minRating, book_data=data.get('items')[0])

  items = data.get('items')
  
  for item in items:
    volume_id = item.get('id')

    # Skip if the book info exists
    if volume_id_list.count(volume_id):
      continue

    try:
      book = BookModel.query.filter_by(volume_id=volume_id).first()

      if book:
        item['average_rating'] = book.average_rating
      else:
        item['average_rating'] = 0
      
      if item['average_rating'] >= minRating:
        books_list.append(item)
    except Exception as e:
      raise e

  res = dict()
  res['items'] = books_list
  res['totalItems'] = len(res['items'])

  # sort and filter using average_rating
  res['items'].sort(key=lambda i: i['average_rating'], reverse=True)

  return res