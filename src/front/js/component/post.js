import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Post = () => {
    const { store, actions } = useContext(Context);




    console.log("hola flux desde home",store.post)

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
                                {/* <button className="btn btn-outline-primary">
                                    <i className="fas fa-thumbs-up"></i> {p.like}
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};