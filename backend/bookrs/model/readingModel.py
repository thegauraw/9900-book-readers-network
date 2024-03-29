from marshmallow import fields, post_dump, pre_load, validate
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy import func

from bookrs.model import BaseModel, db, ma
from bookrs.utils.custom_datetime import get_str_datetime_now, get_response_datetime_format, get_str_date_now
from bookrs.services.monitors import monitor_readings

class ReadingModel(BaseModel):
    __tablename__ = 'readings'
    id = db.Column(db.Integer(), primary_key=True)
    volume_id = db.Column(db.String(20), db.ForeignKey("book_details.volume_id"), nullable=False)
    reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)
    
    rating = db.Column(db.Float(precision=2), default=None)
    review = db.Column(db.Text, default=None)
    last_update_review_rating_at = db.Column(db.DateTime(timezone=True), nullable=True)
    has_read = db.Column(db.Boolean, default=False)
    last_update_read_at = db.Column(db.Date, nullable=True)

    def save(self):
        """Save an instance of the model from the database."""
        try:

            db.session.add(self)
            db.session.commit()
            reading_data = [{item.volume_id: item.average} for item in ReadingModel.query.with_entities(func.avg(ReadingModel.rating).label('average'), ReadingModel.volume_id).filter_by(volume_id=self.volume_id)]
            
            # update book average_rating
            from .bookModel import BookModel
            book_data = BookModel.query.filter_by(volume_id=self.volume_id).first()
            book_data.average_rating = reading_data[0][self.volume_id]

            db.session.commit()
            monitor_readings(reader_id=self.reader_id)

            return self
        except IntegrityError:
            db.session.rollback()
            return False
        except SQLAlchemyError:
            db.session.rollback()
        return False

    def update(self):
        """Update an instance of the model from the database."""
        try:
            reading_data = [{item.volume_id: item.average} for item in ReadingModel.query.with_entities(func.avg(ReadingModel.rating).label('average'), ReadingModel.volume_id).filter_by(volume_id=self.volume_id)]
            
            # update book average_rating
            from .bookModel import BookModel
            book_data = BookModel.query.filter_by(volume_id=self.volume_id).first()
            book_data.average_rating = reading_data[0][self.volume_id]

            db.session.commit()
            monitor_readings(reader_id=self.reader_id)

            return self
        except SQLAlchemyError:
            db.session.rollback()
            return False

    def __repr__(self):
        return f'<Reading {self.id} for book {self.volume_id} by {self.reader_id} { "has read" if self.has_read else "unread" }>'


class ReadingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ReadingModel
        load_instance = True
        include_fk = True
        
    reader = fields.Nested('ReaderSchema', only=("username",))
            
    @pre_load
    def preprocess_validation(self, reading, many, **kwargs):
        #User can update the rating to 0 and review to empty string, in this case, the review is existed with updated datetime
        if ('rating' in reading or 'review' in reading):
            reading['last_update_review_rating_at'] = get_str_datetime_now()
        #When user want to delete the review and rating, set all related fields to None
        if('last_update_review_rating_at' in reading and reading['last_update_review_rating_at'] is None):
            reading['review'] = None
            reading['rating'] = None
            reading['last_update_review_rating_at'] = None
        if ('has_read' in reading):
            if reading['has_read'] == True and 'last_update_read_at' not in reading:
                reading['last_update_read_at'] = get_str_date_now()
            if reading['has_read'] == False:
                reading['last_update_read_at'] = None
        return reading

    @post_dump
    def process_datetime_format(self, reading, many, **kwargs):
        if (reading and reading['last_update_review_rating_at'] is not None):
            reading['last_update_review_rating_at'] = get_response_datetime_format(reading['last_update_review_rating_at'])
        reading['username'] = reading['reader']['username']
        del reading['reader']
        return reading


reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)
