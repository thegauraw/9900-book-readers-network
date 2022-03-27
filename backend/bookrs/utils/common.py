class InvalidUsage(Exception):
  status_code = 400

  def __init__(self, message, status_code=None, payload=None):
    Exception.__init__(self)
    
    print(message)
    self.message = message
    self.payload = payload

    if status_code is not None:
      self.status_code = status_code

  def to_dict(self):
    resp = dict(self.payload or ())
    resp['message'] = self.message

    return resp