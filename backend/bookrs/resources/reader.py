from flask import Blueprint, request
from flask_restful import Resource

from bookrs.model.readerModel import ReaderModel
from bookrs.utils.exceptions import InvalidEmailException
from bookrs.utils.common import SUCCESS

reader_bp = Blueprint('reader', __name__)

class Reader(Resource):

    def get(self):
      data = request.args.getlist('email')[0]
      account = ReaderModel.query.filter_by(email=data).first()

      if not account:
        raise InvalidEmailException()

      return SUCCESS(status_code=200)

    def put(self):
        pass
