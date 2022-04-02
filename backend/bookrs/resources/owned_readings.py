from flask import Blueprint, request
from flask_restful import Resource
from marshmallow import ValidationError
from pyparsing import empty
from bookrs.model.readingModel import ReadingModel, reading_schema
from bookrs.utils.common import SUCCESS
from flask_jwt_extended import get_jwt_identity, jwt_required
from bookrs.utils.exceptions import InvalidParameterException, BookNotFoundException, ReadingNotFoundException, OwnedReadingHasExistedException
from werkzeug.exceptions import NotFound

owned_readings_bp = Blueprint('owned_readings', __name__)
class OwnedReadingByBookId(Resource):
    decorators = [jwt_required()]
    def get(self, book_id):
        try:
            current_user = get_jwt_identity()
            #TODO: Check the book is existed before. If the book not found, raise 404.
            #db_result = BookModel.query.filter_by(book_id=book_id).first_or_404()
            
            #The reading record can be not found at the beginning
            db_result = ReadingModel.query.filter_by(reader_id=current_user, book_id=book_id).first()
            return SUCCESS(payload=reading_schema.dump(db_result))
        except NotFound:
            raise BookNotFoundException()
        
    def post(self, book_id):
        try:
            #TODO: Check the book is existed before. If the book not found, raise 404.
            #db_result = BookModel.query.filter_by(book_id=book_id).first_or_404()
            current_user = get_jwt_identity()
            db_result = ReadingModel.query.filter_by(reader_id=current_user, book_id=book_id).first()
            #Limit: one user can only create a reading for a book
            if not db_result:
                raise OwnedReadingHasExistedException()
            data = request.get_json()
            data['reader_id'] = current_user
            data['book_id'] = book_id
            reading = reading_schema.load(data)
            result = reading_schema.dump(reading.save())
            return SUCCESS(payload=result, status_code=201)
        except NotFound:
            raise BookNotFoundException()
        except ValidationError as err:
            raise InvalidParameterException(err.messages)
        
    def put(self, book_id):
        try:
            #TODO: Check the book is existed before. If the book not found, raise 404.
            #db_result = BookModel.query.filter_by(book_id=book_id).first_or_404()
            current_user = get_jwt_identity()
            db_result = ReadingModel.query.filter_by(reader_id=current_user, book_id=book_id).first()
            data = request.get_json()
            print("data", data)
            data['reader_id'] = current_user
            data['book_id'] = book_id
            if db_result:
                reading = reading_schema.load(data, instance=db_result)
                result = reading_schema.dump(reading.update())
                return SUCCESS(payload=result)
            else:
                reading = reading_schema.load(data)
                result = reading_schema.dump(reading.save())
                return SUCCESS(payload=result, status_code=201)
        except NotFound:
            raise BookNotFoundException()
        except ValidationError as err:
            raise InvalidParameterException(err.messages)
        
        

    def delete(self, book_id):
        try:
            current_user = get_jwt_identity()
            db_result = ReadingModel.query.filter_by(reader_id=current_user, book_id=book_id).first_or_404()
            result = reading_schema.dump(db_result.delete())
            return SUCCESS(payload=result)
        except NotFound:
            raise ReadingNotFoundException()
      
