from marshmallow import fields, post_dump
from sqlalchemy import func
from sqlalchemy.orm import relationship, backref
from werkzeug.exceptions import NotFound

from bookrs.model import BaseModel, db, ma
from bookrs.utils.exceptions import BookNotFoundException
from .readingModel import ReadingModel, ReadingSchema
from marshmallow_sqlalchemy import auto_field


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
    readings = relationship(ReadingModel, backref=backref('book_details'))

    @classmethod
    def get_by_top_average_rating(cls, n):
        try:
            book_list = cls.query.order_by(cls.average_rating.desc()).all()
            n = min(len(book_list), n)
            return book_list[:n]
        except NotFound:
            raise BookNotFoundException()


class BookDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BookModel
        load_instance = True
        include_fk = True  
    
    readings = fields.List(fields.Nested(ReadingSchema(exclude=("volume_id",))))

    @post_dump
    def process_statistics(self, book, many, **kwargs):
        if 'readings' in book:
            readings_arr = book["readings"]
            has_read = [p["has_read"] for p in readings_arr if p["has_read"] == True]
            valid_ratings = [p["rating"] for p in readings_arr if p["rating"] is not None]
            valid_reviews = [p["review"] for p in readings_arr if p["review"] is not None]
            book["count_has_read"] = len(has_read)
            book['count_valid_ratings'] = len(valid_ratings)
            book["count_valid_reviews"] = len(valid_reviews)
            del book["readings"]
        return book


book_details_schema = BookDetailsSchema()
books_details_schema = BookDetailsSchema(many=True)

class Collectedbooks(BaseModel):
    __tablename__ = 'collectedbooks'
    id = db.Column(db.Integer, primary_key=True)
    collection_id = db.Column(db.Integer, db.ForeignKey("collections.id"))
    book_id = db.Column(db.Integer, db.ForeignKey("book_details.id"))
    collected_date = db.Column(db.DateTime)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self

    @classmethod
    def get_most_collected_book(cls):
        books = [ {item.book_id: item.count} for item in Collectedbooks.query.with_entities(func.count(Collectedbooks.book_id).label('count'), Collectedbooks.book_id).group_by(Collectedbooks.book_id).order_by(func.count(Collectedbooks.book_id).desc()).all()]
    
        return books


class CollectedBooksSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Collectedbooks
        load_instance = True
        include_fk = True

    id = auto_field()
    collection_id = fields.Int(required=True)
    book_id = fields.Int(required=True)
    collected_date = fields.DateTime(required=True)


collected_book_schema = CollectedBooksSchema()
collected_books_schema = CollectedBooksSchema(many=True)
