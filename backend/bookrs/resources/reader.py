from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource

from bookrs.model import db
from bookrs.resources import api
from bookrs.model.readerModel import ReaderModel, reader_schema
from bookrs.utils.exceptions import InvalidEmailException, SendEmailException, InvalidProfileException
from bookrs.utils.common import SUCCESS
from bookrs.tools.email import send_password_reset_email


reader_bp = Blueprint('reader', __name__)

class Reader(Resource):
    def get(self):
      """
        endpoint for reader: /reader
        endpoint for password reset: /reader?email=<string:email>&reset=true

      """
      account = None
      reset = False

      if request.args.getlist('email'):
        email = request.args.getlist('email')[0]
        reset = request.args.getlist('reset')[0]
        account = ReaderModel.query.filter_by(email=email).first()
        account = reader_schema.dump(account)
      else:
        verify_jwt_in_request()
        current_reader = get_jwt_identity()
        account = ReaderModel.query.filter_by(id=current_reader).first()
        account = reader_schema.dump(account)
  
      if not account:
        raise InvalidEmailException()
      
      # send password reset email
      if reset:
        res = send_password_reset_email(email)

        if res != 'Sent':
          raise SendEmailException()

      return SUCCESS(status_code=200, payload=account)

    def put(self):
      data = request.get_json()
      account = None

      verify_jwt_in_request()
      
      try:
        if request.args.getlist('reset'):
          reset = request.args.getlist('reset')[0]
          if reset:
            email = get_jwt_identity()[0]
            account = ReaderModel.query.filter_by(email=email).first()
          else:
            reader_id = get_jwt_identity()[0]
            account = ReaderModel.query.filter_by(id=reader_id).first()
        else:
            reader_id = get_jwt_identity()[0]
            account = ReaderModel.query.filter_by(id=reader_id).first()

        # update reader
        if 'password' in data and data.get('password'):
          account.password_hash = generate_password_hash(data.get('password'), method='sha256')
        if 'gender' in data:
          account.gender = data.get('gender')
        if 'age' in data:
          account.age = data.get('age')
        db.session.commit()
      except Exception as e:
        db.session.rollback()
        raise e

      return SUCCESS()


class ProfileById(Resource):
  def get(self, reader_id):
    """
      Get profile: `GET /profile/<int:reader_id>`

    """

    data = ReaderModel.query.filter_by(id=reader_id).first()
    
    if not data:
      raise InvalidProfileException()

    profile = reader_schema.dump(data)

    return SUCCESS(status_code=200, payload=profile)
    

api.add_resource(Reader, '/reader')
api.add_resource(ProfileById, '/profile/<int:reader_id>')