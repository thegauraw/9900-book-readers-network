from flask import Blueprint
from flask_restful import Resource

readers_bp = Blueprint('readers', __name__)

class Readers(Resource):
    def get(self):
        return [{'id': 1, 'name': 'John'}]
