from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource

from bookrs.model.reading import Reading, readings_schema, reading_schema, reading_creating_schema
from bookrs.utils.common import InvalidUsage

readings_bp = Blueprint('readings', __name__)

class Readings(Resource):

    def get(self):
        readings = Reading.query.all()
        return readings_schema.dump(readings)

    def post(self):
        data = request.get_json()
        
        reading = reading_creating_schema.load(data)
        result = reading_creating_schema.dump(reading.create())

        return make_response(jsonify({"readings": result}), 201)
