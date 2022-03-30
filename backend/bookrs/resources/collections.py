from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.model.collection import collection_schema
from bookrs.resources import api


collections_bp = Blueprint('collections', __name__)

class CollectionMyList(Resource):
  decorators = [jwt_required()]
  
  def post(self):
    """create my collection `POST /collections {'title': '', 'description': ''}` """
    data = request.get_json()
    data['reader_id'] = get_jwt_identity()
    collection = collection_schema.load(data)
    collection.save()
    collection_data_dump = collection_schema.dump(collection)
    return make_response(jsonify({
        'status': 'success',
        'message': 'Collection created successfully',
        'data': collection_data_dump,
    }), 201)

api.add_resource(CollectionMyList, '/collections', endpoint='collections')