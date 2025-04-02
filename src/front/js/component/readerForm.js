// import React, { useState, useContext } from "react";
//  import { Context } from "../store/appContext";
 
//  const ReaderForm = () => {
//      const { actions } = useContext(Context);
 
//      const [formData, setFormData] = useState({
//          first_name: "",
//          last_name: "",
//          email: "",
//          password: ""
//      });
 
//      const handleChange = (e) => {
//          setFormData({
//              ...formData,
//              [e.target.name]: e.target.value
//          });
//      };
 
//      const handleSubmit = async (e) => {
//          e.preventDefault();
//          await actions.agregarReader(formData);
//          setFormData({ first_name: "", last_name: "", email: "", password: "" }); // limpiar
//      };
 
//      return (
//          <div className="container mt-4">
//              <h2 className="mb-4">Agregar nuevo lector</h2>
//              <form onSubmit={handleSubmit}>
//                  <div className="mb-3">
//                      <label htmlFor="first_name" className="form-label">Nombre</label>
//                      <input
//                          type="text"
//                          className="form-control"
//                          id="first_name"
//                          name="first_name"
//                          value={formData.first_name}
//                          onChange={handleChange}
//                          placeholder="John"
//                      />
//                  </div>
 
//                  <div className="mb-3">
//                      <label htmlFor="last_name" className="form-label">Apellido</label>
//                      <input
//                          type="text"
//                          className="form-control"
//                          id="last_name"
//                          name="last_name"
//                          value={formData.last_name}
//                          onChange={handleChange}
//                          placeholder="Doe"
//                      />
//                  </div>
 
//                  <div className="mb-3">
//                      <label htmlFor="email" className="form-label">Email</label>
//                      <input
//                          type="email"
//                          className="form-control"
//                          id="email"
//                          name="email"
//                          value={formData.email}
//                          onChange={handleChange}
//                          placeholder="john@example.com"
//                      />
//                  </div>
 
//                  <div className="mb-3">
//                      <label htmlFor="password" className="form-label">Contraseña</label>
//                      <input
//                          type="password"
//                          className="form-control"
//                          id="password"
//                          name="password"
//                          value={formData.password}
//                          onChange={handleChange}
//                          placeholder="********"
//                      />
//                  </div>
 
//                  <button type="submit" className="btn btn-primary">Agregar lector</button>
//              </form>
//          </div>
//      );
//  };
 
//  export default ReaderForm;


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
