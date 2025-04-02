
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Button, Modal } from "react-bootstrap";
const ReaderForm = ({ show, handleClose, actions }) => {
    const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.agregarReader(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Lector</Modal.Title>
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
                <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Agregar Escritor
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReaderForm;
