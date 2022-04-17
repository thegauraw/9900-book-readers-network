import copy
import json

from bookrs.model.bookModel import BookModel

def retriveBooks(minRating=0., book_data=None):
  books = BookModel.query.filter(BookModel.average_rating >= minRating).all()

  books_list = []
  volume_id_list = []
  for book in books:
    data = copy.deepcopy(book_data)
    data['id'] = book.volume_id
    if book.title:
      data['volumeInfo']['title'] = book.title
    if book.authors:
      data['volumeInfo']['authors'] = json.loads(book.authors)
    if book.smallThumbnail:
      data['volumeInfo']['imageLinks']['smallThumbnail'] = book.smallThumbnail
    if book.categories:
      data['volumeInfo']['categories'] = json.loads(book.categories)
    if book.publisher:
      data['volumeInfo']['publisher'] = book.publisher
    if book.publishedDate:
      data['volumeInfo']['publishedDate'] = book.publishedDate
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
        item['average_rating'] = book.average_rating if book.average_rating else 0
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