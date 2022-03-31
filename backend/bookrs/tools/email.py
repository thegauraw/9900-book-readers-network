
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
      MAIL_SERVER = 'smtp.qq.com',
      MAIL_PORT = 587,
      MAIL_USE_TLS = True,
      MAIL_USE_SSL = False,
      MAIL_USERNAME = '674744997@qq.com',
      MAIL_PASSWORD = 'bmeejkmkemuybfji',
  ))

  mail = Mail(app)

  if not isinstance(email, list):
    email = [email]

  print(f'email: {email}')
  msg = Message('Reset Password', sender = '674744997@qq.com', recipients = email)
  msg.body = ""
  token = create_token(email)
  print('token, ', token)
  msg.html = create_reset_html(token)

  if sync:
    mail.send(msg)
  else:
    Thread(target=send_async_email, args=(current_app._get_current_object(), mail, msg)).start()

  return 'Sent'
