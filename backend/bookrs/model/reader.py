from bookrs.model import db

class Reader(db.Model):
    __tablename__ = 'readers'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), unique=True, nullable=False)
    lastname = db.Column(db.String(80), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), unique=True, nullable=False)
    status = db.Column(db.Boolean)

    def __repr__(self):
         return '<Reader %d %r>' % (self.id, self.username)