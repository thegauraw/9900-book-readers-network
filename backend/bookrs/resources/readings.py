from flask import Blueprint
from flask_restful import Resource
from bookrs.model.readingModel import ReadingModel, readings_schema
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookNotFoundException
from werkzeug.exceptions import NotFound
readings_bp = Blueprint('readings', __name__)

class Readings(Resource):
    def get(self): #debug purpose only
        readings = ReadingModel.query.all()
        return SUCCESS(payload=readings_schema.dump(readings))
    
class ReadingsByBookId(Resource):
    def get(self, book_id):
        try:
            #TODO: Check the book is existed before. If the book not found, raise 404.
            #db_result = BookModel.query.filter_by(book_id=book_id).first_or_404()
            readings = ReadingModel.query.filter_by(book_id=book_id).all()
            return SUCCESS(payload=readings_schema.dump(readings))
        except NotFound:
            raise BookNotFoundException()