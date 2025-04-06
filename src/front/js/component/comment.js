import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Comentario } from "./comentario";


export const Comment = () => {
    const { store, actions } = useContext(Context);
    const [visibleComentarios, setVisibleComentarios] = useState(null);

    const toggleComentarios = (postId) => {
        setVisibleComentarios(visibleComentarios === postId ? null : postId);

        
    };
    const handleAddComentario = async (postId, descripcion,readerId) => {
        const newComentario = {
            descripcion,
            likes: 0,
            post_id: postId,
            reader_id: readerId,
        };
        await actions.agregarCommentario(newComentario);
    };

    return (    
        <div className="container mt-5">
        <h2 className="text-center mb-4">Posts</h2>
        <div className="row">
            {store.post.map(p => (
                <div key={p.id} className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{p.title}</h5>
                            <p className="card-text">{p.content}</p>
                            <small className="text-muted">{p.fecha}</small>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <button className="btn btn-outline-primary">
                                    <i className="fas fa-thumbs-up"></i> {p.like}
                                </button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => toggleComentarios(p.id)}
                                >
                                    Comentarios
                                </button>
                            </div>
                            {visibleComentarios === p.id && (
                                <Comentario
                                    postId={p.id}
                                    actions={actions}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
       
    );
};