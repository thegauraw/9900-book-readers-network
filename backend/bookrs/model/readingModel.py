from marshmallow import fields, post_dump, pre_load, validate
from bookrs.model import BaseModel, db, ma
from bookrs.utils.custom_datetime import get_str_datetime_now, get_response_datetime_format
class ReadingModel(BaseModel):
    __tablename__ = 'readings'
    
    #TODO: Update it to foreign key after books table ready.
    book_id = db.Column(db.String, nullable=False)#db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)
    reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)
    
    rating = db.Column(db.Float(precision=2), default=None)
    review = db.Column(db.Text, default=None)
    last_update_review_rating_at = db.Column(db.DateTime(timezone=True), nullable=True)
    has_read = db.Column(db.Boolean, default=False)
    last_update_read_at = db.Column(db.DateTime(timezone=True), nullable=True)
    
    def __repr__(self):
         return f'<Reading {self.id} for book {self.book_id} by {self.reader_id} { "has read" if self.has_read else "unread" }>'


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
            reading['last_update_read_at'] = get_str_datetime_now()
        return reading
    @post_dump
    def process_datetime_format(self, reading, many, **kwargs):
        if (reading and reading['last_update_review_rating_at'] is not None):
            reading['last_update_review_rating_at'] = get_response_datetime_format(reading['last_update_review_rating_at'])
        if (reading and reading['last_update_read_at'] is not None):
            reading['last_update_read_at'] = get_response_datetime_format(reading['last_update_read_at'])
        reading['username'] = reading['reader']['username']
        del reading['reader']
        return reading
    
        
reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)