from flask import Blueprint, request
from flask_restful import Resource

from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.model.bookModel import BookModel, books_details_schema

ranking_bp = Blueprint('ranking', __name__)


class RankingBooks(Resource):

  def get(self):
    """
      List top-rated books `GET /ranking?n=<int: number>`
    """

    n = int(request.args.get('n')) if request.args.get('n') else 5

    try:
      data = BookModel.get_by_top_average_rating(n)
      books = books_details_schema.dump(data)

      return SUCCESS(payload=books)
    except Exception as e:
      raise e


api.add_resource(RankingBooks, '/ranking')