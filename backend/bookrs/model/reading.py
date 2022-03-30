from marshmallow import fields, pre_load, validate
from bookrs.model import db, ma
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from bookrs.utils.custom_datetime import get_str_datetime_now

class Reading(db.Model):
    __tablename__ = 'readings'
    id = db.Column(db.Integer, primary_key=True)
    
    #TODO: Update it to foreign key after books table ready.
    book_id = db.Column(db.Integer, nullable=True)
    reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)
    
    rating = db.Column(db.Float(precision=2), default=None)
    review = db.Column(db.Text, default=None)
    last_update_review_rating_at = db.Column(db.DateTime(timezone=True), nullable=True)
    has_read = db.Column(db.Boolean, default=False)
    last_update_read_at = db.Column(db.DateTime(timezone=True), nullable=True)
        
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
        return self

    def __repr__(self):
         return f'<Reading {self.id} for book {self.book_id} by {self.reader_id} { "has read" if self.has_read else "unread" }>'


class ReadingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reading
        load_instance = True
        include_fk = True
    rating = fields.Float(validate=validate.Range(min=0, max=5))
            
    @pre_load
    def preprocess_validation(self, reading, many, **kwargs):
        if ('rating' in reading or 'review' in reading):
            reading['last_update_review_rating_at'] = get_str_datetime_now()
        if ('has_read' in reading):
            reading['last_update_read_at'] = get_str_datetime_now()
        return reading
        
reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)