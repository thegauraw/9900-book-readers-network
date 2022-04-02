from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.model.collection import Collection, collection_schema, collections_schema
# from bookrs.model.reader import Reader
from bookrs.model.readerModel import ReaderModel
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import CollectionDeleteException


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
    return SUCCESS(message='Collections listed successfully', payload=collections_data_dump)

  def post(self):
    """create my collection `POST /collections {'title': '', 'description': ''}` """
    data = request.get_json()
    data['reader_id'] = get_jwt_identity()
    collection = collection_schema.load(data)
    collection.save()
    collection_data_dump = collection_schema.dump(collection)
    return SUCCESS(message='Collection created successfully', status_code=201, payload=collection_data_dump)


class CollectionMyId(Resource):
  decorators = [jwt_required()]

  def get(self, collection_id):
    """view collection info `GET /collections/<int:collection_id>` """

    # anyone can view the collection record
    collection = Collection.query.get_or_404(collection_id)
    collection_data_dump = collection_schema.dump(collection)
    return SUCCESS(message='Collection returned successfully', payload=collection_data_dump)

  def put(self, collection_id):
    """update collection info `PUT /collections/<int:collection_id> {'title': '', 'description': ''}` """
    # only owner can update the collection record
    current_user = get_jwt_identity()
    collection_obj = Collection.query.filter_by(reader_id=current_user, id=collection_id).first_or_404()
    data = request.get_json()
    collection = collection_schema.load(data, instance=collection_obj)
    collection.update()
    collection_data_dump = collection_schema.dump(collection)
    return SUCCESS(message='Collection updated successfully', payload=collection_data_dump)

  def delete(self, collection_id):
    """delete collection record `DELETE /collections/<int:collection_id>` """
    # only owner can delete the collection record
    current_user = get_jwt_identity()
    collection = Collection.query.filter_by(reader_id=current_user, id=collection_id).first_or_404()
    if collection.delete():
      return SUCCESS(message='Collection deleted successfully')
    else:
      raise CollectionDeleteException


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
    return SUCCESS(message="Reader's collection listed successfully", payload=collections_data_dump)


api.add_resource(CollectionMyList, '/collections', endpoint='collections')
api.add_resource(CollectionMyId, '/collections/<int:collection_id>', endpoint='collection_id')
api.add_resource(CollectionOthersList, '/collections/<username>', endpoint='collection_user')