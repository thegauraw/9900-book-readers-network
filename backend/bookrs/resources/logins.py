import datetime

from flask import Blueprint, current_app, request, make_response, jsonify
from flask_jwt_extended import create_access_token
from flask_restful import Resource

# from bookrs.model.reader import Reader
from bookrs.model.readerModel import ReaderModel
from bookrs.resources import api
from bookrs.utils.exceptions import NullLoginFildsException, InvalidEmailException, InvalidPasswordException, InvalidEmailorPasswordException


login_bp = Blueprint('login', __name__)

class Login(Resource):
    def post(self):
        auth = request.get_json()

        if not auth:
          raise NullLoginFildsException()
        
        if not auth.get('email'):
          raise InvalidEmailException()

        if not auth.get('password'):
          raise InvalidPasswordException()
        
        account = ReaderModel.query.filter_by(email=auth.get('email')).first()

        if not account:
          raise InvalidEmailorPasswordException()

        if account.check_password(auth.get('password')):
          #Set the token to never expire temporarily for development.
          #TODO: Discuss token refreshing solution in Sprint3.
          token = create_access_token(identity=str(account.id), expires_delta=False)#datetime.timedelta(days=1))
          return make_response(jsonify({"token": token}), 200)

        raise InvalidEmailorPasswordException()


api.add_resource(Login, '/login', endpoint='account')