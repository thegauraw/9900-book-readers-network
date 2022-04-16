import json
import requests


from bookrs.model.bookModel import BookModel, book_details_schema
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookCreateException

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
      book['smallThumbnail'] = data['volumeInfo']['imageLinks']['smallThumbnail']
      book['publishedDate'] = data['volumeInfo']['publishedDate'] if 'publishedDate' in data['volumeInfo'] else ''
      book['publisher'] = data['volumeInfo']['publisher'] if 'publisher' in data['volumeInfo'] else ''
      book['categories'] = json.dumps(data['volumeInfo']['categories']) if 'categories' in data['volumeInfo'] else json.dumps([])
      book['average_rating'] = 0.0

      return book
        
  except:
    raise BookCreateException()


