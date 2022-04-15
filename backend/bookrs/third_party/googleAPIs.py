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
      book['title'] = data['volumeInfo']['title']
      book['authors'] = json.dumps(data['volumeInfo']['authors'])
      book['book_image_url'] = data['volumeInfo']['imageLinks']['smallThumbnail']
      book['publishedDate'] = data['volumeInfo']['publishedDate']
      book['publisher'] = data['volumeInfo']['publisher']
      book['categories'] = json.dumps(data['volumeInfo']['categories'])
      book['average_rating'] = 0.0

      return book
        
  except:
    raise BookCreateException()


