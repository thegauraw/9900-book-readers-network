import os

from flask import Flask, jsonify, make_response
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager

from .resources.pages import pages_bp
# from .resources.readers import Readers, readers_bp
from .resources.reader import Reader, reader_bp
from .resources.logins import Login, login_bp
from .resources.collections import collections_bp
from .resources.books import books_bp
from .resources.readings import Readings, ReadingsByBookId, readings_bp
from .resources.owned_readings import OwnedReadingByBookId, owned_readings_bp
from bookrs.utils.common import InvalidUsage
from bookrs.utils.exceptions import BadRequestError, InternalServerError, ResourceNotFoundError


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # app.config['CORS_HEADERS'] = 'Content-Type'
    cors = CORS(app)

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
    app.register_error_handler(400, BadRequestError)
    app.register_error_handler(404, ResourceNotFoundError)
    app.register_error_handler(500, InternalServerError)

    app.register_blueprint(collections_bp)

    app.register_blueprint(login_bp)

    app.register_blueprint(readings_bp)

    app.register_blueprint(owned_readings_bp)

    app.register_blueprint(pages_bp)

    # app.register_blueprint(readers_bp)    
    api.add_resource(Reader, '/reader')
    app.register_blueprint(reader_bp)

    @app.errorhandler(InvalidUsage)
    def handle_invalid_usage(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    app.register_blueprint(books_bp)

    return app
