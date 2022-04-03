import re

from marshmallow import fields, pre_load
from werkzeug.security import check_password_hash, generate_password_hash
from marshmallow_sqlalchemy import auto_field

from bookrs.model import db, ma

class GoalModel(db.Model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(80), db.ForeignKey("readers.id"), nullable=False)
    start_time = db.Column(db.Date, nullable=False)
    end_time = db.Column(db.Date, nullable=False)
    book_num = db.Column(db.Integer, nullable=False)
    finish = db.Column(db.Boolean, default=False)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __repr__(self):
         return f'<Goal {self.id} { "finished" if self.status else "in progress" }>'


class GoalSchema(ma.SQLAlchemySchema):
    class Meta(ma.SQLAlchemySchema.Meta):
       model = GoalModel
       load_instance = True
       include_fk = True

    id = auto_field() #fields.Number(dump_only=True)
    userid = fields.Int(required=True)
    book_num = fields.Int(required=True)
    start_time = fields.Date(required=True)
    end_time = fields.Date(required=True)


goal_schema = GoalSchema()
goals_schema = GoalSchema(many=True)
