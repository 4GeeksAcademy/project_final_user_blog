import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const RegisterWriter = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.agregarWriter(formData);
        if (success) {
            setFormData({ first_name: "", last_name: "", email: "", password: "" });
            navigate("/login");
        }
    };

    return (
        <div className="container my-4 p-4 shadow rounded bg-light" style={{ maxWidth: "500px" }}>
            <h2 className="text-center mb-4">Agregar Escritor</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Apellido"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <div className="d-grid mb-3">
                    <Button variant="primary" type="submit">
                        Agregar Escritor
                    </Button>
                </div>
                <div className="text-center">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterWriter;
