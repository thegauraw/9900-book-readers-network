from marshmallow import fields
from marshmallow_sqlalchemy import auto_field
from werkzeug.exceptions import NotFound
from datetime import datetime

from bookrs.model import BaseModel, db, ma
from bookrs.utils.exceptions import EventNotFoundException


class EventModel(BaseModel):
  __tablename__ = "events"
  title = db.Column(db.String(120), nullable=False)
  description = db.Column(db.String(120))
  venue = db.Column(db.String(120))
  date_and_time = db.Column(db.DateTime, nullable=False)
  seats = db.Column(db.Integer)
  status = db.Column(db.Boolean, default=True)
  organised_by = db.Column(db.Integer(), db.ForeignKey("readers.id"), nullable=False) # reader_id
  related_book = db.Column(db.String(20), db.ForeignKey("book_details.volume_id"), nullable=False) # book_id

  @classmethod
  def get_by_id(cls, id):
    try:
      return cls.query.get_or_404(id)
    except NotFound:
      raise EventNotFoundException()

  @classmethod
  def get_by_reader_and_id(cls, id, organised_by):
    try:
      return cls.query.filter_by(organised_by=organised_by, id=id).first_or_404()
    except NotFound:
      raise EventNotFoundException()

  @classmethod
  def get_all(cls, group):
    group = group or "upcoming"

    if group == "past":
      return cls.query.filter(EventModel.date_and_time < datetime.now()).order_by(cls.date_and_time.desc()).all()
    else:
      return cls.query.filter(EventModel.date_and_time > datetime.now()).order_by(cls.date_and_time.asc()).all()

  @classmethod
  def get_all_for_reader(cls, organised_by, involvement):
    """type: ['participate',  'organise']"""
    involvement = involvement or "participate"
    if involvement == "organise":
      return cls.query.filter_by(organised_by=organised_by).order_by(cls.date_and_time.asc()).all()
    else:
      # TODO: handle participation
      # UPDATE: participation to be handled from a different model
      return cls.query.filter_by(organised_by=organised_by).order_by(cls.date_and_time.asc()).all()
  
  def allows_registration(self):
    """allow reader to register to/book for an event until before it starts"""
    if self.date_and_time > datetime.now() : # i.e. if event date-and-time is in the future
      return True
    else:
      return False

  def allows_comment(self):
    """allow reader to comment on the event after they have participated"""
    if self.date_and_time > datetime.now() : # i.e. if event date-and-time is in the future
      return False
    else:
      return True


class EventSchema(ma.SQLAlchemySchema):
  class Meta(ma.SQLAlchemySchema.Meta):
    model = EventModel
    load_instance = True

  id = auto_field()
  title = fields.Str(required=True)
  description = fields.Str()
  venue = fields.Str()
  date_and_time = fields.DateTime()
  seats = fields.Int()
  status = fields.Bool()
  organised_by = fields.Int()
  related_book = fields.Str()


event_schema = EventSchema()
events_schema = EventSchema(many=True)