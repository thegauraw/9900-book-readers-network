from marshmallow import fields
from marshmallow_sqlalchemy import auto_field
from werkzeug.exceptions import NotFound

from bookrs.model import BaseModel, db, ma
from bookrs.model.bookModel import collectedbooks
from bookrs.utils.exceptions import CollectionNotFoundException


class Collection(BaseModel):
  __tablename__ = "collections"
  title = db.Column(db.String(80), nullable=False)
  description = db.Column(db.String(200), nullable=False)
  reader_id = db.Column(db.Integer(), db.ForeignKey("readers.id"), nullable=False)
  books = db.relationship("BookModel", secondary=collectedbooks, lazy="subquery", backref=db.backref('collections', lazy=True))

  @classmethod
  def get_by_id(cls, id):
    try:
      return cls.query.get_or_404(id)
    except NotFound:
      raise CollectionNotFoundException()

  @classmethod
  def get_by_reader_and_id(cls, id, reader_id):
    try:
      return cls.query.filter_by(reader_id=reader_id, id=id).first_or_404()
    except NotFound:
      raise CollectionNotFoundException()

  @classmethod
  def get_all(cls):
    return cls.query.all()

  @classmethod
  def get_all_for_reader(cls, reader_id):
    return cls.query.filter_by(reader_id=reader_id).all()


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