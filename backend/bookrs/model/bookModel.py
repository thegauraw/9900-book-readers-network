from marshmallow import fields, post_dump, pre_load, validate
from bookrs.model import BaseModel, db, ma
from sqlalchemy.orm import relationship, backref
from .readingModel import ReadingModel, ReadingSchema

class BookModel(BaseModel):
    __tablename__ = 'book_details'
    id = db.Column(db.Integer(), primary_key=True)
    volume_id = db.Column(db.String(20), unique=True)
    title = db.Column(db.String(), default=None)
    book_image_url = db.Column(db.String(), default=None)
    average_rating = db.Column(db.Float(precision="10,1"), default=None)
    authors = db.Column(db.String(50), default=None)
    smallThumbnail = db.Column(db.String(100), default=None)
    categories = db.Column(db.String(50), default=None)
    publisher = db.Column(db.String(20), default=None)
    publishedDate = db.Column(db.String(20), default=None)
    readings = relationship(ReadingModel, backref=backref('readings'))

class BookDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BookModel
        load_instance = True
        include_fk = True  
    
    readings = fields.List(fields.Nested(ReadingSchema(exclude=("volume_id",))))
    
    @post_dump
    def process_statistics(self, book, many, **kwargs):
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