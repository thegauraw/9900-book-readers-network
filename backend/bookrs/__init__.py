import os

from flask import Flask, jsonify, make_response
from flask_jwt_extended import JWTManager
from flask_restful import Api
from .resources.pages import pages_bp
from .resources.readers import Readers, readers_bp
from .resources.logins import Login, login_bp
from .resources.collections import collections_bp

def resource_not_found(e):
    return make_response(jsonify({
        'status': 'error',
        'message': 'Requested resource not found',
    }), 404)

def internal_server_error(err):
  return make_response(jsonify({
      'status': 'error',
      'message': 'Could not perform requested operation',
  }), 500)

def bad_request(err):
  return make_response(jsonify({
      'status': 'error',
      'message': 'Please check your request',
  }), 400)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # TODO: move this to config file
    app.config.from_mapping(
        JWT_SECRET_KEY='test-jwt-key', # TODO: move this to config file and CHANGE THIS
        SECRET_KEY='dev', # TODO: move this to config file and CHANGE THIS
        SQLALCHEMY_DATABASE_URI=os.path.join('sqlite:////', app.instance_path[1:], 'bookrs.sqlite'),
        SQLALCHEMY_TRACK_MODIFICATIONS=True
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass


    from .model import db, ma, migrate
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    from .resources import api
    # workaround to allow flask custom error handlers handle the erros instead of flask-restful
    # from https://github.com/flask-restful/flask-restful/issues/280#issuecomment-280648790
    # replace: `api.init_app(app)` with:
    handle_exception = app.handle_exception
    handle_user_exception = app.handle_user_exception
    api.init_app(app)
    app.handle_exception = handle_exception
    app.handle_user_exception = handle_user_exception
    jwt = JWTManager(app)

    # add generic error handler before registering blueprint
    app.register_error_handler(400, bad_request)
    app.register_error_handler(404, resource_not_found)
    app.register_error_handler(500, internal_server_error)

    app.register_blueprint(collections_bp)

    app.register_blueprint(login_bp)

    app.register_blueprint(pages_bp)

    app.register_blueprint(readers_bp)
    return app
