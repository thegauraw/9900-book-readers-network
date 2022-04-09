import re

from marshmallow import fields, pre_load
from werkzeug.security import check_password_hash, generate_password_hash
from marshmallow_sqlalchemy import auto_field

from bookrs.model import db, ma

class GoalModel(db.Model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(80), db.ForeignKey("readers.id"), nullable=False)
    month = db.Column(db.String(10), nullable=False)
    # end_time = db.Column(db.Date, nullable=False)
    goal_num = db.Column(db.Integer, nullable=False)
    # finish = db.Column(db.Boolean, default=False)
    # finished_num = db.Column(db.Integer, default=0)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    """def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self"""

    def update(self):
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
    goal_num = fields.Int(required=True)
    month = fields.Str(required=True)
    # end_time = fields.Date(required=True)
    # finish = fields.Bool(default=False)
    # finished_num = fields.Int(default=0)


goal_schema = GoalSchema()
goals_schema = GoalSchema(many=True)
