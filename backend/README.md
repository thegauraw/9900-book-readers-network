# Backend Instructions



## 1. Backend Setup:

### 1.1 Before running project:

**NOTE**: Please ensure that the project uses a version of Python 3.x or above, preferably Python 3.7.4.

- install python virtualenv so that the packages do not conflict with the system packages: `pip install virtualenv==16.7.7`
- Create virtual env: `virtualenv venv`

### 1.2 Running project

How to run the app?

- From the folder `backend/`
- Activate virtual env: `source venv/bin/activate`
- Install all dependencies: `pip install -r requirements.txt`
- Run flask app: `sh start_app.sh`



## 2 Code structure

```js
frontend
│   README.md
|   start_app.sh                  // For deployment in localhost
|   cloud_run.py                  // For deployment in the Cloud Service Platform
|   install_database.py           // Data installation script 
|   requirements.txt              // Python dependencies
│   app.yaml
|
└───bookrs
│   │  __init__.py                // Application entry
│   │
│   └───model                     // Database Model defitions
│   │
│   └───resources                 // All APIs provided the back-end
│   │
│   └───third_party               // Third-party APIs
│   │
│   └───tools                     // Tools (e.g. email send)
│   │
│   └───utils                     // Common function definitions (e.g. error handler, Custom error, badges' definitions)
|
└───migrations                    // For database upgrade and downgrade
```



## 2 Development Guide:

### 3.1 How to add any new database changes?

- Create database migration for every database (mostly structural) changes: e.g.
  to create a table `readers` (plural) in the database, first create model
  `Reader` (singular) then run:

```
    export FLASK_APP=bookrs
    export FLASK_ENV=development
    flask db migrate -m "create table readers"
```

Check and edit (if necessary) newly generate migration file in
`migrations/versions` then run: `flask db upgrade`

- **NOTE**: the migration file can be generated after defining a model class. If you
  make update on the class, you have to update the migration file accordingly.
- **NOTE**: to reverse the `flask db upgrade` operation, run: `flask db downgrade`

### 3.2 API end points available in this version:

Some of the API endpoints are listed here. Details can be seen in the Python files under`backend\bookrs\resources`. Also we provide a json document exported from postman for reference in the `Documentations\BookRS-Flask.postman_collection.json`.

- `GET /` returns 'Hello world'
- `GET /readers` returns dummy reader JSON
- `POST /readers` with following example in body as:
  `Content-Type: application/json; charset=utf-8` returns status `Created 201`
  
  ```
  {
      "username": "test1",
      "email": "test1@example.com",
      "password": "test1@example.com",
      "gender": "Male",
      "age": 18
  }
  ```
- `POST /login` with this body as: `Content-Type: application/json` returns
  status 200 with result
  `{"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NzI0ODgzMywianRpIjoiNTdjZGZiNGEtYzMyYy00ODM2LWE0MTYtZTU2ZDMxY2UyY2M1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE2NDcyNDg4MzMsImV4cCI6MTY0NzMzNTIzM30.cu5b104Xo6k6UvXhUZICQveAqA2h8OM7K_88hTLUFXE" }`
  
  ```
  {
      "email": "test@example.com",
      "password": "test@example.com"
  }
  ```

==========================





