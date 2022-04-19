from bookrs import create_app
from bookrs.model import db

FLASK_APP='bookrs'
FLASK_ENV='development'

# setup email envs
MAIL_SERVER='smtp.sendgrid.net'
MAIL_PORT=465
MAIL_USE_TLS=False
MAIL_USE_SSL=True
MAIL_USERNAME='apikey'
MAIL_PASSWORD='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'
MAIL_SENDER='daydayup9900@gmail.com'

app = create_app()
db.init_app(app)
db.create_all(app=app)

if __name__ == '__main__':
   app.run(debug=True)