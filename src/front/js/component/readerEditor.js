

import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";

export const ReaderEditor = ({ show, handleClose,reader}) => {
	const { store, actions } = useContext(Context);
	const [formData, setFormData] = useState({
		first_name:reader.first_name,
		last_name:reader.last_name,
		email:reader.email
	});

	// const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ 
			...formData, 
			[e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
		await actions.updateReader(reader.id, formData);
		alert("Escritor actualizado");
		handleClose();
	};

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Lector</Modal.Title>
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


