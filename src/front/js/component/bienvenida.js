


import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AgregarPost } from "./agregarPost";
 import "../../styles/bienvenida.css"; // Para estilos personalizados
 import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Bienvenida = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const nombre = location.state?.nombre || "Invitado";

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token1");
        localStorage.removeItem("currentUser1");
        navigate("/");
    };

    return (
        <div className="bienvenida-container d-flex">
            <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
                <div className="sidebar-header" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <span>Menú</span>
                    <span className="toggle-icon"></span>
                </div>
                {sidebarOpen && (
                    <ul className="sidebar-list">
                        <li>📄 Ver mis posts</li>
                        <Link to="/postwriter">📄 Ver los posts</Link>
                        <li>⚙️ Ajustes</li>
                        <li onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>🚪 Cerrar sesión</li>
                    </ul>
                )}
            </div>

            <div className="content flex-grow-1 p-4">
                <div className="d-flex align-items-center mb-3">
                    <img
                        src={rigoImageUrl}
                        alt="Usuario"
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px" }}
                    />
                    <h4 className="m-0">Hola, <strong>{nombre}</strong></h4>
                </div>

                <AgregarPost />
            </div>
        </div>
    );
};
