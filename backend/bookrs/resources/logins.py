from flask import Blueprint, request, make_response, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_restful import Resource

# from bookrs.model.reader import Reader
from bookrs.model.readerModel import ReaderModel
from bookrs.resources import api
from bookrs.utils.exceptions import NullLoginFieldException, InvalidEmailException, InvalidPasswordException, InvalidEmailorPasswordException, InvalidTokenException
from flask_jwt_extended import get_jwt_identity, jwt_required
from bookrs.utils.common import SUCCESS
login_bp = Blueprint('login', __name__)

class Login(Resource):
    def post(self):
        auth = request.get_json()

        if not auth:
          raise NullLoginFieldException()
        
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

class Verify(Resource):
    decorators = [jwt_required()]
    def get(self):
        try:
            current_user = get_jwt_identity()
            account = ReaderModel.query.filter_by(id=current_user).first()
            if account:
              return SUCCESS()
            else:
              raise InvalidTokenException()
        except Exception as e:
            raise e
api.add_resource(Login, '/login', endpoint='account')
api.add_resource(Verify, '/verify')