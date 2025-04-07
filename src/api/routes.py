"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Writer,Reader,Post,Comentario
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200




@api.route('/writers', methods=['POST'])
def create_writer():
    data = request.get_json()

    
    if not all(field in data for field in ('first_name', 'last_name', 'email', 'password')):
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    existing = Writer.query.filter_by(email=data['email']).first()
    if existing:
        return jsonify({"error": "Ya existe un escritor con este correo"}), 409

    writer = Writer(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=data['password']  
    )

    db.session.add(writer)
    db.session.commit()

    return jsonify(writer.serialize()), 201


@api.route('/writers', methods=['GET'])            
def get_writers():                
    writers = Writer.query.all()
    return jsonify([writer.serialize() for writer in writers]), 200

@api.route('/writers/<int:writer_id>', methods=['PUT'])
def update_writer(writer_id):
    writer = Writer.query.get_or_404(writer_id)      
    data = request.get_json()   

    writer.first_name = data.get('first_name', writer.first_name)
    writer.last_name = data.get('last_name', writer.last_name)
    writer.email = data.get('email', writer.email)
    writer.password = data.get('password', writer.password)

    db.session.commit()
    return jsonify(writer.serialize()), 200



@api.route('/writers/<int:writer_id>', methods=['DELETE'])
def delete_writer(writer_id):
    writer = Writer.query.get_or_404(writer_id)
    db.session.delete(writer)
    db.session.commit()
    return jsonify({"message": "Writer eliminado correctamente"}), 200





@api.route('/writers/login', methods=['POST'])
def login():
#    response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }
#    return jsonify(response_body), 200

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Por favor ingresa el email y la contraseña"}), 400

    writer = Writer.query.filter_by(email=email).first()

    if not writer or writer.password != int(password):  
        return jsonify({"message": "Credenciales incorrectas"}), 401

    return jsonify({
        "message": f"Bienvenido, {writer.first_name}!",
        "writer": writer.serialize()
    }), 200







##### reader crud #####






@api.route('/readers', methods=['POST'])
def create_reader():
    data = request.get_json()

    
    if not all(field in data for field in ('first_name', 'last_name', 'email', 'password')):
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    existing = Reader.query.filter_by(email=data['email']).first()
    if existing:
        return jsonify({"error": "Ya existe un escritor con este correo"}), 409

    reader = Reader(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=data['password']  
    )

    db.session.add(reader)
    db.session.commit()

    return jsonify(reader.serialize()), 201


@api.route('/readers', methods=['GET'])            
def get_reader():                
    readers = Reader.query.all()
    return jsonify([writer.serialize() for writer in readers]), 200

@api.route('/readers/<int:reader_id>', methods=['PUT'])
def update_reader(reader_id):
    reader = Reader.query.get_or_404(reader_id)      
    data = request.get_json()   

    reader.first_name = data.get('first_name', reader.first_name)
    reader.last_name = data.get('last_name', reader.last_name)
    reader.email = data.get('email', reader.email)
    reader.password = data.get('password', reader.password)

    db.session.commit()
    return jsonify(reader.serialize()), 200



@api.route('/readers/<int:reader_id>', methods=['DELETE'])
def delete_reader(reader_id):
    reader = Reader.query.get_or_404(reader_id)
    db.session.delete(reader)
    db.session.commit()
    return jsonify({"message": "Reader eliminado correctamente"}), 200




@api.route('/readers/login', methods=['POST'])
def loginReader():
#    response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }
#    return jsonify(response_body), 200

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Por favor ingresa el email y la contraseña"}), 400

    reader = Reader.query.filter_by(email=email).first()

    if not reader or reader.password != int(password):  
        return jsonify({"message": "Credenciales incorrectas"}), 401

    return jsonify({
        "message": f"Bienvenido, {reader.first_name}!",
        "reader": reader.serialize()
    }), 200





##### crud posts  ######







@api.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    new_post = Post(
        title=data.get('title'),
        content=data.get('content'),
        writer_id=data.get('writer_id'),
        abstract=data.get('abstract'),
        likes=data.get('likes', 0)  # Por defecto 0 si no se envía
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify(new_post.serialize()), 201

  





@api.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.serialize() for post in posts]), 200


@api.route('/posts/<int:post_id>', methods=['GET'])
def get_post_id(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify(post.serialize()), 200   
   
     

@api.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id) 
    data = request.get_json()

    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    post.abstract = data.get('abstract', post.abstract)  
    post.likes = data.get('likes', post.likes)

    db.session.commit()

    return jsonify(post.serialize()), 200

  

@api.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    return jsonify({"message": "Post eliminado correctamente"}), 200








#### crud comentario########



@api.route('/comentarios', methods=['POST'])
def create_comentario():
    data = request.get_json()

    if not all(field in data for field in ('descripcion', 'reader_id', 'post_id')):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    comentario = Comentario(
        descripcion=data['descripcion'],
        reader_id=data['reader_id'],
        post_id=data['post_id'],
        likes=data.get('likes', 0)
    )

    db.session.add(comentario)
    db.session.commit()

    return jsonify(comentario.serialize()), 201




@api.route('/comentarios', methods=['GET'])
def get_comentarios():
    comentarios = Comentario.query.all()
    return jsonify([c.serialize() for c in comentarios]), 200



@api.route('/comentarios/<int:post_id>', methods=['GET'])
def get_comentarios_by_post(post_id):
    comentarios = Comentario.query.filter_by(post_id=post_id).all()
    
    if not comentarios:
        return jsonify({"message": "No hay comentarios para este post"}), 404

    return jsonify([c.serialize() for c in comentarios]), 200






@api.route('/comentarios/<int:comentario_id>', methods=['DELETE'])
def delete_comentario(comentario_id):
    comentario = Comentario.query.get_or_404(comentario_id)
    db.session.delete(comentario)
    db.session.commit()
    return jsonify({"message": "Comentario eliminado correctamente"}), 200




@api.route('/comentarios/<int:comentario_id>', methods=['GET'])
def get_comentario(comentario_id):
    comentario = Comentario.query.get_or_404(comentario_id)
    return jsonify(comentario.serialize()), 200
























