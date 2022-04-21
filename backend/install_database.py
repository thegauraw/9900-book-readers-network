from bookrs import create_app
from bookrs.model import db


app = create_app()
db.init_app(app)
db.create_all(app=app)