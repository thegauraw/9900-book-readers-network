import os

from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS, cross_origin

from bookrs.utils.common import InvalidUsage
from .resources.pages import pages_bp
from .resources.readers import Readers, readers_bp
from .resources.logins import Login, login_bp

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # app.config['CORS_HEADERS'] = 'Content-Type'

    originURL = "http://localhost:3000"
    cors = CORS(app, resources={r"/readers": {"origins": originURL}, r"/login": {"origins": originURL}})

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

    api = Api(app)
    jwt = JWTManager(app)

    api.add_resource(Readers, '/readers')
    app.register_blueprint(readers_bp)

    api.add_resource(Login, '/login')
    app.register_blueprint(login_bp)

    app.register_blueprint(pages_bp)

    @app.errorhandler(InvalidUsage)
    def handle_invalid_usage(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code

        return response

    return app
