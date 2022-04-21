from marshmallow import fields
from marshmallow_sqlalchemy import auto_field
from bookrs.model import db, ma

class GoalModel(db.Model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(80), db.ForeignKey("readers.id"), nullable=False)
    month = db.Column(db.String(10), nullable=False)  # "yyyy-mm" format string to make it intuitive
    goal_num = db.Column(db.Integer, nullable=False)  # number of books to read in a month

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

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

    id = auto_field()
    userid = fields.Int(required=True)
    goal_num = fields.Int(required=True)
    month = fields.Str(required=True)


goal_schema = GoalSchema()
goals_schema = GoalSchema(many=True)
