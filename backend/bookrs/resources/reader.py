from flask import Blueprint, request
from flask_restful import Resource
from werkzeug.security import generate_password_hash
from bookrs.model import db

from bookrs.model.readerModel import ReaderModel
from bookrs.utils.exceptions import InvalidEmailException, SendEmailException
from bookrs.utils.common import SUCCESS
from bookrs.tools.email import send_password_reset_email
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request

reader_bp = Blueprint('reader', __name__)

class Reader(Resource):
    def get(self):
      email = request.args.getlist('email')[0]
      account = ReaderModel.query.filter_by(email=email).first()

      if not account:
        raise InvalidEmailException()

      reset = request.args.getlist('reset')[0]
      
      if reset:
        res = send_password_reset_email(email)

        if res != 'Sent':
          raise SendEmailException()

      return SUCCESS(status_code=200)

    def put(self):
      data = request.get_json()

      verify_jwt_in_request()
      email = get_jwt_identity()[0]
      password_hash = generate_password_hash(data.get('password'), method='sha256')

      try:
        account = ReaderModel.query.filter_by(email=email).first()
        account.password_hash = password_hash
        db.session.commit()
      except Exception as e:
        raise e

      return SUCCESS()
