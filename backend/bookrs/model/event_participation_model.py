import random, string
from marshmallow import fields
from marshmallow_sqlalchemy import auto_field
from werkzeug.exceptions import NotFound
from bookrs.model import BaseModel, db, ma
from bookrs.utils.exceptions import EventParticipationNotFoundException
from bookrs.model.event_model import EventModel, EventSchema
from bookrs.model.readerModel import ReaderModel, ReaderSchema


def random_code():
    return ''.join(random.choice(string.printable[0:62]) for i in range(8))

class EventParticipationModel(BaseModel):
  __tablename__ = "event_participations"
  event_id = db.Column(db.Integer, db.ForeignKey('events.id'), primary_key=True)
  participant_id = db.Column(db.Integer, db.ForeignKey('readers.id'), primary_key=True)
  like = db.Column(db.Boolean, nullable=True)
  comment = db.Column(db.Text, nullable=True)
  registered_at = db.Column(db.DateTime)
  registration_code = db.Column(db.String(8), default=random_code)
  status = db.Column(db.Boolean, default=True) #booking status

  event = db.relationship(EventModel, backref=db.backref("participants", cascade="all, delete-orphan"))
  participant = db.relationship(ReaderModel, backref=db.backref("participations", cascade="all, delete-orphan"))

  # @classmethod
  # def get_by_id(cls, id):
  #   try:
  #     return cls.query.get_or_404(id)
  #   except NotFound:
  #     raise EventNotFoundException()

  @classmethod
  def get_by_participant_and_event_id(cls, event_id, participant_id):
    try:
      return cls.query.filter_by(participant_id=participant_id, event_id=event_id).first_or_404()
    except NotFound:
      raise EventParticipationNotFoundException()
    
  @classmethod
  def get_all_for_event(cls, event_id):
    """all the participations (e.g. for comments) for the event"""
    return cls.query.filter_by(event_id=event_id).all()


  # @classmethod
  # def get_all(cls, group):
  #   group = group or "upcoming"

  #   if group == "past":
  #     return cls.query.filter(EventModel.date_and_time < datetime.now()).all()
  #   else:
  #     return cls.query.filter(EventModel.date_and_time > datetime.now()).all()

  # @classmethod
  # def get_all_for_reader(cls, organised_by, involvement):
  #   """type: ['participate',  'organise']"""
  #   involvement = involvement or "participate"
  #   if involvement == "organise":
  #     return cls.query.filter_by(organised_by=organised_by).all()
  #   else:
  #     # TODO: handle participation
  #     # UPDATE: participation to be handled from a different model
  #     return cls.query.filter_by(organised_by=organised_by).all()


class ParticipationSchema(ma.SQLAlchemySchema):
  class Meta(ma.SQLAlchemySchema.Meta):
    model = EventParticipationModel
    load_instance = True
  
  id = auto_field()
  like = fields.Bool()
  comment = fields.Str()
  registered_at = fields.DateTime()
  registration_code = fields.Str()
  status = fields.Bool()
  reader = fields.Nested(ReaderSchema(only=("username",)))
  # event = fields.Nested(EventSchema(only=("title",)))
  # event = fields.Pluck("self", "title", many=True)
  event = fields.Pluck("self", "title")


participation_schema = ParticipationSchema()
participations_schema = ParticipationSchema(many=True)