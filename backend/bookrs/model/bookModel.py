from marshmallow import fields, post_dump, pre_load, validate
from bookrs.model import BaseModel, db, ma
from sqlalchemy.orm import relationship, backref
from .readingModel import ReadingModel, ReadingSchema

class BookModel(BaseModel):
    __tablename__ = 'book_details'
    id = db.Column(db.Integer(), primary_key=True)
    volume_id = db.Column(db.String(20), unique=True)
    average_rating = db.Column(db.Float(precision=2), default=None)
    count_has_read = db.Column(db.Integer, default=None)
    count_valid_ratings = db.Column(db.Integer, default=None)
    count_valid_reviews = db.Column(db.Integer, default=None)
    last_read_at = db.Column(db.DateTime(timezone=True), default=None)
    last_collected_at = db.Column(db.DateTime(timezone=True), default=None)
    readings = relationship(ReadingModel, backref=backref('readings'))
    

class BookDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BookModel
        load_instance = True
        include_fk = True  
    
    readings = fields.List(fields.Nested(ReadingSchema(exclude=("volume_id",))))
    
    @post_dump
    def process_statistics(self, book, many, **kwargs):
        print(book)
        readings_arr = book["readings"]
        has_read = [p["has_read"] for p in readings_arr if p["has_read"] == True]
        valid_ratings = [p["rating"] for p in readings_arr if p["rating"] is not None]
        valid_reviews = [p["review"] for p in readings_arr if p["review"] is not None]
        book["average_rating"] = None if len(valid_ratings) == 0 else sum(valid_ratings)/len(valid_ratings)
        book["count_has_read"] = len(has_read)
        book['count_valid_ratings'] = len(valid_ratings)
        book["count_valid_reviews"] = len(valid_reviews)
        #TODO for book recommendation
        #book["last_read_at"]
        #book["last_collected_at"]
        del book["readings"]
        return book
    
        
book_details_schema = BookDetailsSchema()
books_details_schema = BookDetailsSchema(many=True)