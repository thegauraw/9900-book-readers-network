# API Backend Setup:
How to setup API backend?

* Install python 3.7.4
* install python virtualenv so that the packages do not conflict with the system packages: `pip install virtualenv==16.7.7`
* Create virtual env: `virtualenv venv`
* `pip install -r requirements.txt`


## Setup Database:
How to create database?
```
  from bookrs import create_app
  from bookrs.model import db

  app = create_app()
  db.init_app(app)
  db.create_all(app=app)
```

## Running project
How to run the app?

* From the folder `backend/`
* Activate virtual env: `source venv/bin/activate`
* Run flask app:
  ```
    export FLASK_APP=bookrs
    export FLASK_ENV=development
    flask run
  ```

## API end points available in this version:

* `GET /` returns 'Hello world'
* `GET /readers` returns dummy reader JSON


==========================
