from flask import Blueprint, request
from flask_restful import Resource

from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.third_party.googleAPIs import seach_books_from_google_with_filter_mode

recommendation_bp = Blueprint('recommendation', __name__)


class RecommendingBooks(Resource):

  def get(self):
    """
      recommend books `GET /recommendation?q=<string: q>&startIndex=<int: startIndex>&m=<string: mode>&maxResults=<int: maxResults>&minRating=<float: minRating>`
      mode includes: title, author, category and publisher
    """

    query_string = request.args.get('q') if request.args.get('q') else None
    startIndex = request.args.get('startIndex') if request.args.get('startIndex') else 0
    mode = request.args.get('m') if request.args.get('m') else 'title'
    maxResults = request.args.get('maxResults') if request.args.get('maxResults') else 5
    minRating = float(request.args.get('minRating')) if request.args.get('minRating') else 0.0 #for advanced filter

    try:
      # recommend books with google api
      data = seach_books_from_google_with_filter_mode(query=query_string,
                                                      mode=mode,
                                                      startIndex=startIndex,
                                                      maxResults=maxResults)

      # TODO: comment out this if there is a need to filter with minimum average rating
      # filtered_data = filterBooksWithRating(minRating=minRating, data=data)

      return SUCCESS(payload=data)
    except Exception as e:
      raise e


api.add_resource(RecommendingBooks, '/recommendation')