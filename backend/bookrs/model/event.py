from marshmallow import fields
from marshmallow_sqlalchemy import auto_field
from werkzeug.exceptions import NotFound

from bookrs.model import BaseModel, db, ma
from bookrs.utils.exceptions import BookNotFoundException
from sqlalchemy.orm import relationship, backref
from .readingModel import ReadingModel

########################################################################
########################################################################
########################################################################
class Event(BaseModel):
    # The new event form  takes event details such as: 1. title, 2. description, 
    # 3. date and time of event, 4. registration open until, 
    # 5. venue and 6. pick a book to which the event is realted to
    __tablename__ = "events"
    title = db.Column(db.String(120), nullable=False)                     # 1.
    description = db.Column(db.String(200), nullable= True )              # 2.
    date_of_event = db.Column(db.DateTime, nullable = False )    # 3.
    registration_open_until = db.Column(db.DateTime, nullable = False )   # 4.
    venue = db.Column(db.String(100), nullable= False)                    # 5.
    #################### Foreign Key 2 ########################
    book_id_related_to_event = db.Column(db.Integer, nullable = False )   # 6.
    #################### Foreign Key 1 ########################
    org_user_id = db.Column(db.Integer, nullable = False )                

    @classmethod
    def get_by_id(cls, id):
        try:
            return cls.query.get_or_404(id)
        except NotFound:
            raise BookNotFoundException()

    pass
########################################################################
########################################################################
########################################################################
class EventSchema(ma.SQLAlchemySchema):
  class Meta(ma.SQLAlchemySchema.Meta):
    model = Event
    load_instance = True

  id = auto_field()
  title = fields.Str(required=True)         # 1.
  description = fields.Str()                # 2.
  date_of_event = fields.Date()             # 3.
  registration_open_until = fields.Date()   # 4.
  venue = fields.Date()                     # 5.

event_schema = EventSchema()
events_schema = EventSchema(many=True)

# ?????????????????????
# collectedevents = db.Table('collected_events',
#                           db.Column('collection_id', db.Integer, db.ForeignKey('collections.id'), primary_key=True),
#                           db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True)
# )

    # #################### Foreign Key 2 ########################
    # book_id_related_to_event = db.Column(db.Integer, nullable = False )   # 6.
    # #################### Foreign Key 1 ########################
    # org_user_id = db.Column(db.Integer, nullable = False ) 
