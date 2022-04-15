import copy

from marshmallow import fields, post_dump, pre_load, validate
from bookrs.model import BaseModel, db, ma
from sqlalchemy.orm import relationship, backref
from .readingModel import ReadingModel, ReadingSchema

class BookModel(BaseModel):
    __tablename__ = 'book_details'
    id = db.Column(db.Integer(), primary_key=True)
    volume_id = db.Column(db.String(20), unique=True)
    title = db.Column(db.String(), default=None)
    average_rating = db.Column(db.Float(precision="10,1"), default=0.)
    authors = db.Column(db.String(), default=None)
    smallThumbnail = db.Column(db.String(), default=None)
    categories = db.Column(db.String(), default=None)
    publisher = db.Column(db.String(), default=None)
    publishedDate = db.Column(db.String(20), default=None)
    readings = relationship(ReadingModel, backref=backref('readings'))

class BookDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BookModel
        load_instance = True
        include_fk = True  
    
    readings = fields.List(fields.Nested(ReadingSchema(exclude=("volume_id",))))
    
    @pre_load
    def preprocess_aveRating(self, book, **kwargs):
        book = copy.deepcopy(book)
        if 'readings' in book:
            readings_arr = book["readings"]
            valid_ratings = [p["rating"] for p in readings_arr if p["rating"] is not None]
            book["average_rating"] = 0. if len(valid_ratings) == 0 else sum(valid_ratings)/len(valid_ratings)

            del book["readings"]

        return book

    @post_dump
    def process_statistics(self, book, many, **kwargs):
        if 'readings' in book:
            readings_arr = book["readings"]
            has_read = [p["has_read"] for p in readings_arr if p["has_read"] == True]
            valid_ratings = [p["rating"] for p in readings_arr if p["rating"] is not None]
            valid_reviews = [p["review"] for p in readings_arr if p["review"] is not None]
            book["average_rating"] = None if len(valid_ratings) == 0 else sum(valid_ratings)/len(valid_ratings)
            book["count_has_read"] = len(has_read)
            book['count_valid_ratings'] = len(valid_ratings)
            book["count_valid_reviews"] = len(valid_reviews)
            del book["readings"]
        return book
    
        
book_details_schema = BookDetailsSchema()
books_details_schema = BookDetailsSchema(many=True)

collectedbooks = db.Table('collected_books',
                          db.Column('collection_id', db.Integer, db.ForeignKey('collections.id'), primary_key=True),
                          db.Column('book_id', db.Integer, db.ForeignKey('book_details.id'), primary_key=True)
)