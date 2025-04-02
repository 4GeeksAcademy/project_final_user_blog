"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Writer,Reader
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
