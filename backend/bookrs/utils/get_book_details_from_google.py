import json
import requests
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookCreateException

def get_book_details_from_google(volume_id):
    try:
      url = f'https://www.googleapis.com/books/v1/volumes/{volume_id}'
      resp = requests.get(url)
      if resp.status_code == 200:
        data = json.loads(resp.text)
      
      response = {'volume_id': data['id'], 'book_image_url': data['volumeInfo']['imageLinks']['smallThumbnail'], 'title':data['volumeInfo']['title']}
      return response
    except:
      raise BookCreateException()