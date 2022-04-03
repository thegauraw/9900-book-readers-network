#!bin/dash

python install_database.py
export FLASK_APP=bookrs
export FLASK_ENV=development

# setup email envs
export MAIL_SERVER='smtp.sendgrid.net'
export MAIL_PORT=465
export MAIL_USE_TLS=False
export MAIL_USE_SSL=True
export MAIL_USERNAME='apikey'
export MAIL_PASSWORD='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'
export MAIL_SENDER='daydayup9900@gmail.com'

# start app
flask run -h localhost -p 3210