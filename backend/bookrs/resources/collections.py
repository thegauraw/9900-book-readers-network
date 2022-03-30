from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.resources import api
from bookrs.model.collection import Collection, collection_schema, collections_schema


collections_bp = Blueprint('collections', __name__)

class CollectionMyList(Resource):
  decorators = [jwt_required()]
  
  def get(self):
    """list all my collections `GET /collections` """
    current_user = get_jwt_identity()
    collections = Collection.query.filter_by(reader_id=current_user).all()
    collections_data_dump = collections_schema.dump(collections)
    return make_response(jsonify({
        'status': 'success',
        'message': 'Collections listed successfully',
        'data': collections_data_dump,
    }), 200)

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


class CollectionMyId(Resource):
  decorators = [jwt_required()]

  def get(self, collection_id):
    """view collection info `GET /collections/<int:collection_id>` """

    # anyone can view the collection record
    collection = Collection.query.get_or_404(collection_id)
    collection_data_dump = collection_schema.dump(collection)
    return make_response(jsonify({
        'status': 'success',
        'message': 'Collection returned successfully',
        'data': collection_data_dump,
    }), 200)

  def put(self, collection_id):
    """update collection info `PUT /collections/<int:collection_id> {'title': '', 'description': ''}` """
    # only owner can update the collection record
    current_user = get_jwt_identity()
    collection_obj = Collection.query.filter_by(reader_id=current_user, id=collection_id).first_or_404()
    data = request.get_json()
    collection = collection_schema.load(data, instance=collection_obj)
    collection.update()
    collection_data_dump = collection_schema.dump(collection)
    return make_response(jsonify({
        'status': 'success',
        'message': 'Collection updated successfully',
        'data': collection_data_dump,
    }), 200)


api.add_resource(CollectionMyList, '/collections', endpoint='collections')
api.add_resource(CollectionMyId, '/collections/<int:collection_id>', endpoint='collection_id')