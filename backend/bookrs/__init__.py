import os

from flask import Flask
from .resources.pages import pages_bp
from flask_restful import Api
from .resources.readers import Readers, readers_bp

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
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


    from .model import db, migrate
    db.init_app(app)
    migrate.init_app(app, db)

    api = Api(app)

    api.add_resource(Readers, '/readers')
    app.register_blueprint(readers_bp)

    app.register_blueprint(pages_bp)

    return app
