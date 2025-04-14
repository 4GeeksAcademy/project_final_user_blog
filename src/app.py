"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,Writer,Reader,Post,Comentario
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required 
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration  
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
CORS(app)

# add the admin
setup_admin(app)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')


# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response




@app.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200




@app.route('/writers', methods=['POST'])
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


@app.route('/writers', methods=['GET'])            
def get_writers():                
    writers = Writer.query.all()
    return jsonify([writer.serialize() for writer in writers]), 200

@app.route('/writers/<int:writer_id>', methods=['PUT'])
def update_writer(writer_id):
    writer = Writer.query.get_or_404(writer_id)      
    data = request.get_json()   

    writer.first_name = data.get('first_name', writer.first_name)
    writer.last_name = data.get('last_name', writer.last_name)
    writer.email = data.get('email', writer.email)
    writer.password = data.get('password', writer.password)

    db.session.commit()
    return jsonify(writer.serialize()), 200



@app.route('/writers/<int:writer_id>', methods=['DELETE'])
def delete_writer(writer_id):
    writer = Writer.query.get_or_404(writer_id)
    db.session.delete(writer)
    db.session.commit()
    return jsonify({"message": "Writer eliminado correctamente"}), 200





@app.route('/writers/login', methods=['POST'])
def login():

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Por favor ingresa el email y la contraseña"}), 400

    writer = Writer.query.filter_by(email=email).first()

    if not writer or writer.password != int(password):  
        return jsonify({"message": "Credenciales incorrectas"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({
        "access_token": access_token,
        "writer": {
            "id": writer.id,
            "first_name":writer.first_name,
            "last_name": writer.last_name,
            "email": writer.email
        }
    }), 200  







##### reader crud #####






@app.route('/readers', methods=['POST'])
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


@app.route('/readers', methods=['GET'])            
def get_reader():                
    readers = Reader.query.all()
    return jsonify([writer.serialize() for writer in readers]), 200

@app.route('/readers/<int:reader_id>', methods=['PUT'])
def update_reader(reader_id):
    reader = Reader.query.get_or_404(reader_id)      
    data = request.get_json()   

    reader.first_name = data.get('first_name', reader.first_name)
    reader.last_name = data.get('last_name', reader.last_name)
    reader.email = data.get('email', reader.email)
    reader.password = data.get('password', reader.password)

    db.session.commit()
    return jsonify(reader.serialize()), 200



@app.route('/readers/<int:reader_id>', methods=['DELETE'])
def delete_reader(reader_id):
    reader = Reader.query.get_or_404(reader_id)
    db.session.delete(reader)
    db.session.commit()
    return jsonify({"message": "Reader eliminado correctamente"}), 200




@app.route('/readers/login', methods=['POST'])
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

    access_token = create_access_token(identity=email)
    return jsonify({
        "access_token": access_token,
        "reader": {
            "id": reader.id,
            "first_name": reader.first_name,
            "last_name": reader.last_name,
            "email": reader.email
        }
    }), 200





##### crud posts  ######







@app.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
  
    user_email = get_jwt_identity()  # ← esto saca el email del token

    writer = Writer.query.filter_by(email=user_email).first()
    if not writer:
        return jsonify({"message": "Usuario no encontrado"}), 404

    nuevo_post = Post(
        title=data.get("title"),
        content=data.get("content"),
        abstract=data.get("abstract"),
        likes=data.get("likes",0),
        writer_id=writer.id  # ← el ID real de quien comenta
    )

    db.session.add(nuevo_post)
    db.session.commit()

    return jsonify(nuevo_post.serialize()), 201
    
    
    

    

  





@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.serialize() for post in posts]), 200


@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post_id(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify(post.serialize()), 200   
   
     

@app.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id) 
    data = request.get_json()

    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    post.abstract = data.get('abstract', post.abstract)  
    post.likes = data.get('likes', post.likes)

    db.session.commit()

    return jsonify(post.serialize()), 200

  

@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    return jsonify({"message": "Post eliminado correctamente"}), 200








#### crud comentario########



@app.route('/comentarios', methods=['POST'])
@jwt_required()
def create_comentario():
    data = request.get_json()
  
    user_email = get_jwt_identity()  # ← esto saca el email del token

    reader = Reader.query.filter_by(email=user_email).first()
    if not reader:
        return jsonify({"message": "Usuario no encontrado"}), 404

    nuevo_comentario = Comentario(
        descripcion=data.get("descripcion"),
        likes=data.get("likes", 0),
        post_id=data.get("post_id"),
        reader_id=reader.id  # ← el ID real de quien comenta
    )

    db.session.add(nuevo_comentario)
    db.session.commit()

    return jsonify(nuevo_comentario.serialize()), 201




@app.route('/comentarios', methods=['GET'])
def get_comentarios():
    comentarios = Comentario.query.all()
    return jsonify([c.serialize() for c in comentarios]), 200



@app.route('/comentarios/<int:post_id>', methods=['GET'])
def get_comentarios_by_post(post_id):
    comentarios = Comentario.query.filter_by(post_id=post_id).all()
    
    if not comentarios:
        return jsonify({"message": "No hay comentarios para este post"}), 404

    return jsonify([c.serialize() for c in comentarios]), 200






@app.route('/comentarios/<int:comentario_id>', methods=['DELETE'])
def delete_comentario(comentario_id):
    comentario = Comentario.query.get_or_404(comentario_id)
    db.session.delete(comentario)
    db.session.commit()
    return jsonify({"message": "Comentario eliminado correctamente"}), 200




@app.route('/comentarios/<int:comentario_id>', methods=['GET'])
def get_comentario(comentario_id):
    comentario = Comentario.query.get_or_404(comentario_id)
    return jsonify(comentario.serialize()), 200



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
