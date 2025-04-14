
   


import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Comentario = ({ postId }) => {
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const { store, actions } = useContext(Context);

    // Restaurar sesión desde localStorage si se recarga   
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("currentUser");
        if (token && user) {
            actions.setTokenAndUser(token, JSON.parse(user));
        }
    }, []);

    // Obtener comentarios del post
    useEffect(() => {
        const fetchComentarios = async () => {
            const resp = await fetch(`${process.env.BACKEND_URL}/comentarios/${postId}`);
            const data = await resp.json();
            setComentarios(data);
        };
        fetchComentarios();
    }, [postId]);

    // Agregar un nuevo comentario
    const handleSubmit = async () => {
        if (!store.currentUser) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }

        const newComentario = {
            descripcion: nuevoComentario,
            likes: 0,
            post_id: postId,
            reader_id: store.currentUser.id
        };

        const creado = await actions.agregarCommentario(newComentario);
        if (creado) {
            setComentarios([
                ...comentarios,
                { ...creado, reader_name: store.currentUser.first_name }
            ]);
            setNuevoComentario("");
        }
    };

    const handleDelete = async (commentId) => {
        await actions.eliminarComentario(commentId);
        setComentarios(comentarios.filter(c => c.id !== commentId));
    };

    return (
        <div className="mt-3">
            <h6>Comentarios</h6>
            <textarea
                className="form-control mb-2"
                rows="2"
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu comentario..."
            ></textarea>
            <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
                Agregar Comentario
            </button>
            <ul className="list-group mt-3"> 
                {comentarios?.map(c => (
                    <li key={c.id} className="list-group-item d-flex justify-content-between">
                        <div>
                            <strong>{c.reader_name || "Anónimo"}</strong>
                            <p>{c.descripcion}</p>
                            <small>Likes: {c.likes}</small>
                        </div>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

