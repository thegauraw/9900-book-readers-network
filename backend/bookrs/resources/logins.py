import datetime

from flask import Blueprint, current_app, request, make_response, jsonify
from flask_jwt_extended import create_access_token
from flask_restful import Resource

from bookrs.model.reader import Reader
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
        
        account = Reader.query.filter_by(email=auth.get('email')).first()

        if not account:
          raise InvalidEmailorPasswordException()

        if account.check_password(auth.get('password')):
          token = create_access_token(identity=str(account.id), expires_delta=datetime.timedelta(days=1))
          return make_response(jsonify({"token": token}), 200)

        raise InvalidEmailorPasswordException()