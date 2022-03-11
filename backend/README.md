# API Backend Setup:
How to setup API backend?

* Install python 3.7.4
* install python virtualenv so that the packages do not conflict with the system packages: `pip install virtualenv==16.7.7`
* Create virtual env: `virtualenv venv`
* `pip install -r requirements.txt`

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
