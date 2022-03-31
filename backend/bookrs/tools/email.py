import os

from threading import Thread
from flask import current_app
from flask_mail import Mail, Message
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token

def send_async_email(app, mail, msg):
  with app.app_context():
    mail.send(msg)

def create_reset_html(token):
  html = """
  <html>
    <body>
      <p>Please click the <a href="http://localhost:3000/passwordReset/{token_}">link</a> to reset your password.</p>
    </body>
  </html>""".format(token_=token)

  return html

def create_token(email):
  return create_access_token(identity=email)

def send_password_reset_email(email, sync=False):
  app = current_app
  mail = Mail(app)

  app.config.update(dict(
      DEBUG = True,
      MAIL_SERVER = os.environ.get('MAIL_SERVER'),
      MAIL_PORT = os.environ.get('MAIL_PORT'),
      MAIL_USE_TLS = True if str(os.environ.get('MAIL_USE_TLS')) == 'True' else False,
      MAIL_USE_SSL = True if str(os.environ.get('MAIL_USE_SSL')) == 'True' else False,
      MAIL_USERNAME = os.environ.get('MAIL_USERNAME'),
      MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD'),
  ))

  mail = Mail(app)
  # print(os.environ.get('MAIL_PORT'))

  if not isinstance(email, list):
    email = [email]

  msg = Message('Reset Password', sender = os.environ.get('MAIL_SENDER'), recipients = email)
  msg.body = ""
  
  #create token for the user
  token = create_token(email)
  msg.html = create_reset_html(token)

  if sync:
    mail.send(msg)
  else:
    Thread(target=send_async_email, args=(current_app._get_current_object(), mail, msg)).start()

  return 'Sent'
