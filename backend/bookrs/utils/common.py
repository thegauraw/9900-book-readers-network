from flask import make_response, jsonify

class InvalidUsage(Exception):
  status_code = 400

  def __init__(self, message, status_code=None, payload=None):
    Exception.__init__(self)
    
    self.message = message
    self.payload = payload

    if status_code is not None:
      self.status_code = status_code

  def to_dict(self):
    resp = dict(self.payload or ())
    resp['msg'] = self.message

    return resp

class SuccessUsage(object):
  def __init__(self):
      pass

  def __call__(self, message='success', status_code=200, payload=None):
    resp = {"payload": payload}
    resp['msg'] = message

    return make_response(jsonify(resp), status_code)

SUCCESS = SuccessUsage()