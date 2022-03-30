from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource
from bookrs.model.reader import Reader, readers_schema, reader_schema, reader_creating_schema
from bookrs.resources import api

readers_bp = Blueprint('readers', __name__)

class Readers(Resource):
    def get(self):
        readers = Reader.query.all()
        return readers_schema.dump(readers)

    def post(self):
        data = request.get_json()
        reader = reader_creating_schema.load(data)
        # result = reader_creating_schema.dump(Reader(**reader))
        result = reader_creating_schema.dump(reader.create())
        return make_response(jsonify({"reader": result}), 201)

    # def get(self, id):
    #     return {'id': id, 'name': 'John'}


api.add_resource(Readers, '/readers', endpoint='reader')