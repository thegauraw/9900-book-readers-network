import json
import requests

from bookrs.model.bookModel import BookModel, book_details_schema
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookCreateException, InvalidSearchException, InvalidRecommendationException

def get_book_details_from_google(volume_id):
  try:
    url = f'https://www.googleapis.com/books/v1/volumes/{volume_id}'
    resp = requests.get(url)
    if resp.status_code == 200:
      data = json.loads(resp.text)

      book = dict()
      book['volume_id'] = volume_id
      book['title'] = data['volumeInfo']['title'] if 'title' in data['volumeInfo'] else ''
      book['authors'] = json.dumps(data['volumeInfo']['authors']) if 'authors' in data['volumeInfo'] else json.dumps([])
      book['smallThumbnail'] = data['volumeInfo']['imageLinks']['smallThumbnail'] if 'imageLinks' in data['volumeInfo'] else ''
      book['publishedDate'] = data['volumeInfo']['publishedDate'] if 'publishedDate' in data['volumeInfo'] else ''
      book['publisher'] = data['volumeInfo']['publisher'] if 'publisher' in data['volumeInfo'] else ''
      book['categories'] = json.dumps(data['volumeInfo']['categories']) if 'categories' in data['volumeInfo'] else json.dumps([])
      book['average_rating'] = 0.0

      return book

  except:
    raise BookCreateException()


def seach_books_from_google(query_string, startIndex):
  """Search books with google api"""
  try:
    url = f'https://www.googleapis.com/books/v1/volumes?q={query_string}&startIndex={startIndex}&maxResults=40'
    resp = requests.get(url)

    if resp.status_code == 200:
      data = json.loads(resp.text)
      #Google book api may return 200 with 0 totalItems / no items / empty items[]
      if int(data.get('totalItems')) > 0 and data.get('items') and len(data.get('items')) > 0:
        return data

    raise InvalidSearchException()
  except Exception as e:
    raise e


def seach_book_detail_from_google(volume_id):
  """Search book detail with google api"""
  try:
    url = f'https://www.googleapis.com/books/v1/volumes/{volume_id}'
    resp = requests.get(url)

    if resp.status_code == 200:
      data = json.loads(resp.text)

      return data

    raise InvalidSearchException()
  except Exception as e:
    raise e


def seach_books_from_google_with_filter_mode(query, mode, startIndex, maxResults):
  """Search book detail with google api"""
  try:
    url = None
    if mode == 'title':
      url = f'https://www.googleapis.com/books/v1/volumes?q=+intitle:{query}&startIndex={startIndex}&maxResults={maxResults}'
    elif mode == 'author':
      url = f'https://www.googleapis.com/books/v1/volumes?q=+inauthor:{query}&startIndex={startIndex}&maxResults={maxResults}'
    elif mode == 'category':
      url = f'https://www.googleapis.com/books/v1/volumes?q=+subject:{query}&startIndex={startIndex}&maxResults={maxResults}'
    elif mode == 'publisher':
      url = f'https://www.googleapis.com/books/v1/volumes?q=+inpublisher:{query}&startIndex={startIndex}&maxResults={maxResults}'

    resp = requests.get(url)

    if resp.status_code == 200:
      data = json.loads(resp.text)

      return data

    raise InvalidRecommendationException()
  except Exception as e:
    raise e