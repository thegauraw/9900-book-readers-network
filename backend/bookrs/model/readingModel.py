import copy
import json

from marshmallow import fields, post_dump, pre_load, validate
from sqlalchemy import event

from bookrs.model import BaseModel, db, ma
from bookrs.utils.custom_datetime import get_str_datetime_now, get_response_datetime_format, get_str_date_now
from bookrs.utils.badges import badges_def
from bookrs.model.achievementModel import AchievementModel, achievement_schema


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
    
    def __repr__(self):
        return f'<Reading {self.id} for book {self.volume_id} by {self.reader_id} { "has read" if self.has_read else "unread" }>'



        # readings = self.query.filter_by(reader_id=reader_id).all()
        # read_list = [1 for r in readings if r['has_read'] is True]
        # print(f'read_list: {read_list}')
        # if len(read_list) == 1:
            # AchievementModel.

    # @staticmethod
    # def register_review_badges(n, reader_id):
    #     ids = badges_def['seq']

    #     # import pdb; pdb.set_trace()
    #     badges_images = [f'review_{i}' for i in ids if n >= i]

    #     for image in badges_images:
    #         data = AchievementModel.query.filter_by(image=image).first()
    #         if not data:
    #             data = dict()
    #             data['image'] = image
    #             data['description'] = image
    #             data['reader_id'] = reader_id
    #             achievement_data = achievement_schema.loads(json.dumps(data))
    #             print(f'achievement_data: {achievement_data}')
    #             achievement_data.save()
                # if :
                    # print(f'achievement_data: {achievement_data}')

    # @staticmethod
    # def register_read_badges(n, reader_id):
    #     pass

    # @staticmethod
    # # @event.listens_for(ReadingModel, 'after_update')
    # def on_update(mapper, connection, target):
    #     t = copy.deepcopy(target)
    #     print(f'target: {target.reader_id}')
    #     readings = ReadingModel.query.filter_by(reader_id=t.reader_id).all()

    #     reviews = [1 for r in readings if r.review and len(r.review) > 0]
    #     has_reads = [1 for r in readings if r.has_read]

    #     ReadingModel.register_review_badges(len(reviews), t.reader_id)
    #     ReadingModel.register_read_badges(len(has_reads), t.reader_id)


    # event.listen(self.review, 'event_one', on_update)
    # @staticmethod
    # def on_delete(mapper, connection, target):
    #     t = copy.deepcopy(target)
    #     # print(f'target: {target.reader_id}')
    #     readings = ReadingModel.query.filter_by(reader_id=t.reader_id).all()

    #     reviews = [1 for r in readings if r.review and len(r.review) > 0]
    #     has_reads = [1 for r in readings if r.has_read]

    #     ReadingModel.register_review_badges(len(reviews), t.reader_id)
    #     ReadingModel.register_read_badges(len(has_reads), t.reader_id)

        # readings = self.query.filter_by(reader_id=reader_id).all()
        # read_list = [1 for r in readings if r['has_read'] is True]
        # print(f'read_list: {read_list}')
        # if len(read_list) == 1:
            # AchievementModel.

# db.event.listen(ReadingModel.review, 'append', ReadingModel.on_update)
# event.listen(ReadingModel, 'after_delete', ReadingModel.on_delete)





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