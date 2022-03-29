import re

from marshmallow import fields, pre_load
from werkzeug.security import check_password_hash, generate_password_hash
from marshmallow_sqlalchemy import auto_field

from bookrs.utils.common import InvalidUsage
from bookrs.model import db, ma

class Reading(db.Model):
    __tablename__ = 'readings'
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, nullable=True)  #TODO: Update it to foreign key after books table ready.
    reader_id = db.Column(db.Integer,  db.ForeignKey("readers.id"))
    rating = db.Column(db.Integer, nullable=True)
    review = db.Column(db.Text, nullable=True)
    read_date = db.Column(db.Date, nullable=True)
    has_read = db.Column(db.Boolean, nullable=True)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, book_id, reader_id, rating=-1, review="", read_date="", has_read=False):
        self.reader_id = reader_id
        self.book_id = book_id #TODO: Update it to foreign key after books table ready.
        self.rating = rating
        self.review = review
        self.read_date = read_date
        self.has_read = has_read

    
    def __repr__(self):
         return f'<Reading {self.id} for book {self.book_id} by {self.readers.username} { "has read" if self.has_read else "unread" }>'


class ReadingSchema(ma.Schema):
    class Meta:
        fields = ("id", "book_id", "reader_id", "rating", "review", "read_date", "has_read")
        model = Reading
        include_fk = True

reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)


class ReadingCreatingSchema(ma.SQLAlchemySchema):
    class Meta(ma.SQLAlchemySchema.Meta):
       model = Reading
       load_instance = True
       include_fk = True

    id = auto_field()
    book_id = auto_field() #TODO: Update it to foreign key after books table ready.
    reader_id = fields.Integer()
    rating = fields.Integer()
    review = fields.Str()
    read_date = fields.Date()
    has_read = fields.Bool(required = False)
    
    #TODO check reader_id before taking actions

reading_creating_schema = ReadingCreatingSchema()