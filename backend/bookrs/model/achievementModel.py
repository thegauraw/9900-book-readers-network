from marshmallow import fields
from bookrs.model import BaseModel, db, ma
from marshmallow_sqlalchemy import auto_field

class AchievementModel(BaseModel):
  __tablename__ = 'achievements'
  id = db.Column(db.Integer, primary_key=True)
  image = db.Column(db.String(20), unique=True)
  description = db.Column(db.String())
  reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)


class AchievementSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    fields = ('id', 'image', 'description', 'reader_id')
    model = AchievementModel
    load_instance = True

  id = auto_field()
  # image = fields.Str(required = True)
  # description = fields.Str(required = False)
  # reader_id = fields.Integer(required = True)

achievement_schema = AchievementSchema()
achievements_schema = AchievementSchema(many=True)
