
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Comentario } from "./comentario";


export const CommentReader = () => {
    const { store, actions } = useContext(Context);
    const [visibleComentarios, setVisibleComentarios] = useState(null);

    const toggleComentarios = (postId) => {
        setVisibleComentarios(visibleComentarios === postId ? null : postId);
    };   

    const handleDeletePost = async (postId) => {
        await actions.eliminarPost(postId);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Posts</h2>

            {/* <AgregarPost />     */}

            <div className="row">
                {store.post.map(p => (
                    <div key={p.id} className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{p.title}</h5>
                                <p><strong>{p.writer_name}</strong></p>
                                <p className="card-text">{p.abstract}</p>
                                <small className="text-muted">{p.fecha}</small>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                <button className="btn btn-outline-primary">
                                        <i className="fas fa-thumbs-up"></i> {p.likes}
                                    </button>
                                  
                                    <button
                                         className="btn btn-outline-secondary"
                                        onClick={() => toggleComentarios(p.id)}
                                    >
                                        Comentarios
                                    </button>
                                  
                                </div>
                                {visibleComentarios === p.id && (
                                    <Comentario postId={p.id} actions={actions} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
