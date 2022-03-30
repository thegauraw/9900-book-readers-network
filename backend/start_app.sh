#!bin/dash

python install_database.py
export FLASK_APP=bookrs
export FLASK_ENV=development
flask run