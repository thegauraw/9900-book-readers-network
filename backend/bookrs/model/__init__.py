from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()

from sqlalchemy.exc import IntegrityError, SQLAlchemyError

class BaseModel(db.Model):
  """Define the base model for all other models."""
  __abstract__ = True
  id = db.Column(db.Integer(), primary_key=True)
  created_on = db.Column(db.DateTime(), server_default=db.func.now(),
                          nullable=False)
  updated_on = db.Column(db.DateTime(),nullable=False,
                          server_default=db.func.now(),
                          onupdate=db.func.now())

  def save(self):
    """Save an instance of the model from the database."""
    try:
      db.session.add(self)
      db.session.commit()
      return True
    except IntegrityError:
      db.session.rollback()
      return False
    except SQLAlchemyError:
      db.session.rollback()
      return False

  def update(self):
    """Update an instance of the model from the database."""
    try:
      db.session.commit()
      return True
    except SQLAlchemyError:
      db.session.rollback()
      return False

  def delete(self):
    """Delete an instance of the model from the database."""
    try:
      db.session.delete(self)
      db.session.commit()
      return True
    except SQLAlchemyError:
      db.session.rollback()
      return False