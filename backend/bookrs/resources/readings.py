from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource

from bookrs.model.readingModel import ReadingModel, readings_schema, reading_schema
from bookrs.utils.common import SUCCESS
from flask_jwt_extended import get_jwt_identity, jwt_required

readings_bp = Blueprint('readings', __name__)

class Readings(Resource):
    decorators = [jwt_required()]
    def get(self):
        current_user = get_jwt_identity()
        readings = ReadingModel.query.filter_by(reader_id=current_user).all()
        return SUCCESS(payload=readings_schema.dump(readings))

    def post(self):
        data = request.get_json()
        #TODO: Check the user and the book are existed
        data['reader_id'] = get_jwt_identity()
        reading = reading_schema.load(data)
        result = reading_schema.dump(reading.save_to_db())
        return SUCCESS(payload=result, status_code=201)
    
