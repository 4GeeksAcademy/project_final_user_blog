import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";

const WriterEditor = ({ show, handleClose,writer }) => {
	const { store, actions } = useContext(Context);
	const [formData, setFormData] = useState({
		first_name: writer.first_name,
		last_name: writer.last_name,
		email: writer.email
	});

	// const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ 
			...formData, 
			[e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
		await actions.updateWriter(writer.id, formData);
		alert("Escritor actualizado");
		handleClose();
	};

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Escritor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    className="form-control mb-2"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Apellido"
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="success" onClick={handleUpdate}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default WriterEditor