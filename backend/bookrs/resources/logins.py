from flask import Blueprint, current_app, request, make_response, jsonify
from flask_jwt_extended import create_access_token
from flask_restful import Resource

import datetime

from bookrs.model.reader import Reader

login_bp = Blueprint('login', __name__)

class Login(Resource):
    def post(self):
        auth = request.get_json()

        if not auth or not auth.get('email') or not auth.get('password'):
          return make_response(jsonify({"error" : "Error! Invalid email or password!"}), 401)
        
        account = Reader.query.filter_by(email=auth.get('email')).first()

        if not account:
          return make_response(jsonify({"error" : "Error! Invalid email or password!"}), 401)

        if account.check_password(auth.get('password')):
          token = create_access_token(identity=str(account.id), expires_delta=datetime.timedelta(days=1))
          return make_response(jsonify({"token": token}), 200)

        return make_response(jsonify({"error" : "Error! Invalid email or password!"}), 401)