
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const AgregarPost = () => {
    const { store, actions } = useContext(Context);
    const [form, setForm] = useState({
        title: "",
        abstract: "",
        content: ""
    });
    const navigate =useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!store.currentUser1) {
            alert("Debes iniciar sesión para publicar.");
            return;
        }

        const newPost = {
            ...form,
            writer_id: store.currentUser1.id,
            writer_name: store.currentUser1.first_name
        };

        const creado = await actions.agregarPost(newPost);
        if (creado) {
            setForm({ title: "", abstract: "", content: "" });
            navigate("/postwriter")
        }
    };

    return (
        <div className="card shadow p-4">
            <h4 className="mb-3">Crear nuevo post</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Título"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="abstract"
                        placeholder="Resumen"
                        rows="2"
                        value={form.abstract}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="content"
                        placeholder="Contenido"
                        rows="4"
                        value={form.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-success">
                    Publicar
                </button>
            </form>
        </div>
    );
};

