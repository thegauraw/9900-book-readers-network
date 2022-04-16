from flask import Blueprint, request
from flask_restful import Resource
from bookrs.model.readingModel import ReadingModel, reading_schema
from bookrs.model.bookModel import BookModel, book_details_schema
from bookrs.utils.common import SUCCESS
from flask_jwt_extended import get_jwt_identity, jwt_required
from bookrs.utils.exceptions import BookCreateException
from bookrs.resources import api
from bookrs.third_party.googleAPIs import get_book_details_from_google



owned_readings_bp = Blueprint('owned_readings', __name__)
class OwnedReadingByBookId(Resource):
    decorators = [jwt_required()]
    def get(self, volume_id):
        try:
            current_user = get_jwt_identity()
            db_result = ReadingModel.query.filter_by(reader_id=current_user, volume_id=volume_id).first()
            if(db_result):
                db_result = reading_schema.dump(db_result)
            return SUCCESS(payload=db_result)
        except Exception as e:
            raise e
        
    # Put is the only way to interact with readings
    def put(self, volume_id):
        try:
            data = request.get_json()
            
            #Create a book record when there is any user reading data stored in our system
            book = BookModel.query.filter_by(volume_id=volume_id).first()
            result = None
            if not book:
                book_data = get_book_details_from_google(volume_id)
                book = book_details_schema.load(book_data)
                if book.save():
                    result = book_details_schema.dump(book)
                else:
                    raise BookCreateException()
            
            current_user = get_jwt_identity()
            db_result = ReadingModel.query.filter_by(reader_id=current_user, volume_id=volume_id).first()
            data['reader_id'] = current_user
            data['volume_id'] = volume_id
            
            if db_result:
                reading = reading_schema.load(data, instance=db_result)
                result = reading_schema.dump(reading.update())
                return SUCCESS(payload=result)
            else:
                reading = reading_schema.load(data)
                result = reading_schema.dump(reading.save())
                return SUCCESS(payload=result, status_code=201)
        except Exception as e:
            raise e


api.add_resource(OwnedReadingByBookId, '/owned_readings/<string:volume_id>')