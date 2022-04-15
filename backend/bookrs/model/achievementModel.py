import copy

from marshmallow import fields, post_dump, pre_load, validate
from bookrs.model import BaseModel, db, ma
from sqlalchemy.orm import relationship, backref
from .readingModel import ReadingModel, ReadingSchema
from .badgeModel import BadgeModel

class AchievementModel(BaseModel):
  __tablename__ = 'achievement'
  id = db.Column(db.Integer(), primary_key=True)
  volume_id = db.Column(db.String(20), unique=True)
  title = db.Column(db.String(), default=None)
  reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)
  badge = db.relationship(BadgeModel, backref='badge')
  # readings = relationship(ReadingModel, backref=backref('readings'))

  # @staticmethod
  # def on_insert():
  #   db.event.listen(lambda)

  

class AchievementSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AchievementModel
        load_instance = True
        include_fk = True  
    

achievement_schema = AchievementSchema()
achievements_schema = AchievementSchema(many=True)
