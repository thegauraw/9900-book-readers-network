from flask import Blueprint
from flask_restful import Resource
from bookrs.model.readingModel import ReadingModel, readings_schema
from bookrs.model.book import Book
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookNotFoundException
from werkzeug.exceptions import NotFound
from bookrs.resources import api
readings_bp = Blueprint('readings', __name__)

class Readings(Resource):
    def get(self): #debug purpose only
        readings = ReadingModel.query.all()
        return SUCCESS(payload=readings_schema.dump(readings))
    
class ReadingsByBookId(Resource):
    def get(self, book_id):
        try:
            Book.query.filter_by(id=book_id).first_or_404()
            readings = ReadingModel.query.filter_by(book_id=book_id).all()
            return SUCCESS(payload=readings_schema.dump(readings))
        except NotFound:
            raise BookNotFoundException()
        
api.add_resource(Readings, '/readings')
api.add_resource(ReadingsByBookId, '/readings/<int:book_id>')