from marshmallow import fields, post_dump, pre_load, validate
from bookrs.model import BaseModel, db, ma
from .achievementModel import AchievementModel

class BadgeModel(BaseModel):
  __tablename__ = 'badge'
  id = db.Column(db.Integer(), primary_key=True)
  title = db.Column(db.String(20), unique=True)
  image = db.Column(db.String(20), unique=True)
  description = db.Column(db.String())
  achievements = db.relationship(AchievementModel, backref=db.backref('badge'))
  # achievement = db.Column(db.Integer, db.ForeignKey("achievement.id"))
  

class BadgeSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = BadgeModel
    load_instance = True
    include_fk = True

  id = auto_field() #fields.Number(dump_only=True)

    

badge_schema = BadgeSchema()
badges_schema = BadgeSchema(many=True)