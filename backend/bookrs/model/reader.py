from bookrs.model import db, ma
from marshmallow import fields, pre_load
from werkzeug.security import generate_password_hash
from marshmallow_sqlalchemy import auto_field

class Reader(db.Model):
    __tablename__ = 'readers'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    status = db.Column(db.Boolean)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, username, email, firstname, lastname, password_hash):
        self.firstname = firstname
        self.lastname = lastname
        self.username = username
        self.email = email
        self.password_hash = password_hash

    def __repr__(self):
         return f'<Reader {self.id} {self.username} { "active" if self.status else "inactive" }>'


class ReaderSchema(ma.Schema):
    class Meta:
        fields = ("id", "firstname", "lastname", "username", "email", "status")
        model = Reader

reader_schema = ReaderSchema()
readers_schema = ReaderSchema(many=True)


class ReaderCreatingSchema(ma.SQLAlchemySchema):
    class Meta(ma.SQLAlchemySchema.Meta):
       model = Reader
       load_instance = True

    id = auto_field() #fields.Number(dump_only=True)
    firstname = fields.Str(required = True)
    lastname = fields.Str(required = True)
    username = fields.Str(required = True)
    email = fields.Str(required = True)
    password_hash = fields.Str(load_only = True)

    @pre_load
    def process_password(self, user, many, **kwargs):
        user['password_hash'] = generate_password_hash(user.pop('password'), method='sha256')
        return user

reader_creating_schema = ReaderCreatingSchema()