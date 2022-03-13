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

# Development Guide:

## How to add any new database changes?
* Create database migration for every database (mostly structural) changes:
e.g. to create a table `readers` (plural) in the database, first create model `Reader` (singular) then run:
```
    export FLASK_APP=bookrs
    export FLASK_ENV=development
    flask db migrate -m "create table readers"
```
Check and edit (if necessary) newly generate migration file in `migrations/versions` then run: `flask db upgrade`


## API end points available in this version:

* `GET /` returns 'Hello world'
* `GET /readers` returns dummy reader JSON


==========================
