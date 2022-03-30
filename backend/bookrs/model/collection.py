from bookrs.model import BaseModel, db, ma
from marshmallow import fields
from marshmallow_sqlalchemy import auto_field
from bookrs.model.book import collectedbooks

class Collection(BaseModel):
  __tablename__ = "collections"
  title = db.Column(db.String(80), nullable=False)
  description = db.Column(db.String(200), nullable=False)
  reader_id = db.Column(db.Integer(), db.ForeignKey("readers.id"), nullable=False)
  books = db.relationship("Book", secondary=collectedbooks, lazy="subquery", backref=db.backref('collections', lazy=True))

  @classmethod
  def get_by_id(cls, id):                 
    return cls.query.filter_by(id=id).first()


class CollectionSchema(ma.SQLAlchemySchema):
  class Meta(ma.SQLAlchemySchema.Meta):
    model = Collection
    load_instance = True
  
  id = auto_field()
  title = fields.Str(required = True)
  description = fields.Str()
  reader_id = fields.Int()

collection_schema = CollectionSchema()
collections_schema = CollectionSchema(many=True)