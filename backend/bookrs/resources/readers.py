from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource

from bookrs.model.reader import Reader, readers_schema, reader_schema, reader_creating_schema
from bookrs.utils.common import InvalidUsage

readers_bp = Blueprint('readers', __name__)

class Readers(Resource):

    def get(self):
        readers = Reader.query.all()
        return readers_schema.dump(readers)

    def post(self):
        data = request.get_json()

        if len(data.get('username')) == 0 or len(data.get('email')) == 0 or len(data.get('password')) == 0:
            raise InvalidUsage('Username, Email or Password are not allowed to be empty!', status_code=403)

        reader = reader_creating_schema.load(data)
        result = reader_creating_schema.dump(reader.create())

        return make_response(jsonify({"reader": result}), 201)
