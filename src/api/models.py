from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }



        

class Writer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f'<Writer {self.first_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # do not serialize the password, its a security breach
        }  

class Reader(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f'<Reader {self.first_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # do not serialize the password, its a security breach
        }  





class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    writer_id = db.Column(db.Integer, db.ForeignKey('writer.id'), nullable=False)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)
    likes = db.Column(db.Integer, default=0)
    abstract = db.Column(db.String(500), nullable=True)

    writer = db.relationship('Writer', backref=db.backref('posts', lazy=True))

    def __repr__(self):
        return f'<Post {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "writer_id": self.writer_id,
            "fecha": self.fecha.isoformat(),
            "likes": self.likes,
            "abstract": self.abstract
        }











class Comentario(db.Model):
    __tablename__ = 'comentarios'

    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.Text, nullable=False)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)
    likes = db.Column(db.Integer, default=0)

    reader_id = db.Column(db.Integer, db.ForeignKey('reader.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

    reader = db.relationship('Reader', backref=db.backref('comentarios', lazy=True))
    post = db.relationship('Post', backref=db.backref('comentarios', lazy=True))

    def __repr__(self):
        return f'<Comentario {self.descripcion[:20]}>'

    def serialize(self):
        return {
            "id": self.id,
            "descripcion": self.descripcion,
            "fecha": self.fecha.isoformat(),
            "likes": self.likes,
            "reader_id": self.reader_id,
            "post_id": self.post_id
        }










