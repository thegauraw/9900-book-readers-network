import re

from marshmallow import fields, pre_load
from werkzeug.security import check_password_hash, generate_password_hash
from marshmallow_sqlalchemy import auto_field
from sqlalchemy.orm import relationship, backref

from bookrs.model import db, ma
from bookrs.model.collection import Collection
from bookrs.utils.exceptions import EmailRegisteredException, EmailFormatException, UsernameRegisteredException
from .readingModel import ReadingModel
class ReaderModel(db.Model):
    __tablename__ = 'readers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    status = db.Column(db.Boolean)
    collections = db.relationship("Collection", backref="owner")
    readings = relationship(ReadingModel, backref=backref('reader'))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, username, email, password_hash):
        self.username = username
        self.email = email
        self.password_hash = password_hash

        self.check_username(username)
        self.check_email(email)

    def check_email(self, email):
        user_email = self.query.filter_by(email=email).first()
        if user_email is not None:
            raise EmailRegisteredException()

        if not re.match(r"^[0-9a-zA-Z_]{0,19}@.*.com$", email):
            raise EmailFormatException()

    def check_username(self, username):
        username = self.query.filter_by(username=username).first()
        if username is not None:
            raise UsernameRegisteredException()

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
         return f'<Reader {self.id} {self.username} { "active" if self.status else "inactive" }>'


class ReaderSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "email", "status")
        model = ReaderModel

reader_schema = ReaderSchema()
readers_schema = ReaderSchema(many=True)


class ReaderCreatingSchema(ma.SQLAlchemySchema):
    class Meta(ma.SQLAlchemySchema.Meta):
       model = ReaderModel
       load_instance = True

    id = auto_field() #fields.Number(dump_only=True)
    username = fields.Str(required = True)
    email = fields.Str(required = True)
    password_hash = fields.Str(load_only = True)

    @pre_load
    def process_password(self, user, many, **kwargs):
        if 'password' in user:
            user['password_hash'] = generate_password_hash(user.pop('password'), method='sha256')
        return user

reader_creating_schema = ReaderCreatingSchema()