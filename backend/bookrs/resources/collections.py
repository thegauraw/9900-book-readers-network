from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.model.collection import Collection, collection_schema, collections_schema
# from bookrs.model.reader import Reader
from bookrs.model.readerModel import ReaderModel
from bookrs.resources import api


collections_bp = Blueprint('collections', __name__)

@collections_bp.app_errorhandler(404)
def resource_not_found(err):
  return make_response(jsonify({
      'status': 'error',
      'message': 'Collection not found',
  }), 404)


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

  def delete(self, collection_id):
    """delete collection record `DELETE /collections/<int:collection_id>` """
    # only owner can delete the collection record
    current_user = get_jwt_identity()
    collection = Collection.query.filter_by(reader_id=current_user, id=collection_id).first_or_404()
    if collection.delete():
      return make_response(jsonify({
          'status': 'success',
          'message': 'Collection deleted successfully',
      }), 200)
    else:
      return make_response(jsonify({
          'status': 'error',
          'message': 'Could not delete collection'
      }), 500)


class CollectionOthersList(Resource):
  decorators = [jwt_required()]

  def get(self, username):
    """list a user's collection"""
    reader = ReaderModel.query.filter_by(username=username).first()  # first_or_404()
    # reader = Reader.query.filter_by(username=username).first()  # first_or_404()
    collections_data_dump = []
    if reader is not None:
      collections = Collection.query.filter_by(reader_id=reader.id).all()
      collections_data_dump = collections_schema.dump(collections)

    return make_response(jsonify({
        'status': 'success',
        'message': "Reader's collection listed successfully",
        'data': collections_data_dump,
    }), 200)


api.add_resource(CollectionMyList, '/collections', endpoint='collections')
api.add_resource(CollectionMyId, '/collections/<int:collection_id>', endpoint='collection_id')
api.add_resource(CollectionOthersList, '/collections/<username>', endpoint='collection_user')