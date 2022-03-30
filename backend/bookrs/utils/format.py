from flask import jsonify

def response(msg, resp_code)：

  header = {"Content-Type":"application/json"}

  return makejsonify(msg), resp_code, header