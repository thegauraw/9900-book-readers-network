import json
import requests


from bookrs.model.bookModel import BookModel, book_details_schema
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookCreateException

def get_book_details_from_google(volume_id):
  book_data = None
  try:
    url = f'https://www.googleapis.com/books/v1/volumes/{volume_id}'
    resp = requests.get(url)
    if resp.status_code == 200:
      data = json.loads(resp.text)
      volume_id = data['id']

      book = BookModel.query.filter_by(volume_id=volume_id).first()

      if not book:
        book['title'] = data['volumeInfo']['title']
        book['authors'] = json.dumps(data['volumeInfo']['authors'])
        book['book_image_url'] = data['volumeInfo']['imageLinks']['smallThumbnail']
        book['publishedDate'] = data['volumeInfo']['publishedDate']
        book['average_rating'] = data['average_rating']
        book['publisher'] = data['volumeInfo']['publisher']
        book['categories'] = json.dumps(data['volumeInfo']['categories'])
        Book = book_details_schema.load(book)
        if Book.save():
          book_data = book_details_schema.dump(Book)
      else:
        book_data = book_details_schema.dump(book)

      return book_data
  except:
    raise BookCreateException()


