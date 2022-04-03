from marshmallow import fields
from marshmallow_sqlalchemy import auto_field
from werkzeug.exceptions import NotFound

from bookrs.model import BaseModel, db, ma
from bookrs.utils.exceptions import BookNotFoundException


class Book(BaseModel):
  __tablename__ = "books"
  title = db.Column(db.String(120), nullable=False)
  authors = db.Column(db.String(200))
  publisher = db.Column(db.String(120))
  publication_date = db.Column(db.Date)
  category = db.Column(db.String(80))

  @classmethod
  def get_by_id(cls, id):
    try:
      return cls.query.get_or_404(id)
    except NotFound:
      raise BookNotFoundException()


class BookSchema(ma.SQLAlchemySchema):
  class Meta(ma.SQLAlchemySchema.Meta):
    model = Book
    load_instance = True
  
  id = auto_field()
  title = fields.Str(required=True)
  authors = fields.Str()
  publisher = fields.Str()
  publication_date = fields.Date()
  category = fields.Str()

book_schema = BookSchema()
books_schema = BookSchema(many=True)


collectedbooks = db.Table('collected_books',
                          db.Column('collection_id', db.Integer, db.ForeignKey('collections.id'), primary_key=True),
                          db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True)
)