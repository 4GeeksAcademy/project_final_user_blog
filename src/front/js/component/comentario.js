
// import React, { useContext, useState } from "react";
// import { Context } from "../store/appContext";

// export const Comentario = ({ postId }) => {
//     const [nuevoComentario, setNuevoComentario] = useState("");
//     const { store, actions } = useContext(Context);
//     console.log("hoola desde Comentario", store.comentario);
   
  

//     const handleSubmit = async (readerId) => {
//         if (nuevoComentario.trim() !== "") {
//             const newComentario = {
//                 descripcion: nuevoComentario,
//                 likes: 0,
//                 post_id: postId,
//                 reader_id: readerId // Cambiado para que no sea una respuesta
//             };
//             await actions.agregarCommentario(newComentario);
//             setNuevoComentario("");
//         }
//     };

//     const handleDelete = async (commentId) => {
//         await actions.eliminarComentario(commentId);
//     };

//     return (
//         <div className="mt-3">
//             <h6>Comentarios</h6>
            
           
//             <div className="mb-3">
//                 <textarea
//                     className="form-control mb-2"
//                     rows="2"
//                     value={nuevoComentario}
//                     onChange={(e) => setNuevoComentario(e.target.value)}
//                     placeholder="Escribe tu comentario..."
//                 ></textarea>
//                 <button 
//                     className="btn btn-sm btn-primary"
//                     onClick={()=>handleSubmit(2)}
//                 >
//                     Agregar Comentario
//                 </button>
//             </div>
            
//             {/* Lista de comentarios */}
//             <ul className="list-group">
//                 {store.comentario.map(c => (
//                     <li key={c.id} className="list-group-item d-flex justify-content-between align-items-start">
//                         <div>
//                             <p className="mb-1">{c.descripcion}</p>
//                             <small className="text-muted">Likes: {c.likes}</small>
//                         </div>
//                         <div>
//                             <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>
//                                 <i className="fas fa-trash"></i>
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };


import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Comentario = ({ postId }) => {
    const { id } = useParams();
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const { store,actions } = useContext(Context);
    console.log("hola",store.currentUser)

    useEffect(() => {
        const fetchComentarios = async () => {
            const resp = await fetch(`https://upgraded-trout-r56pvr9vgrg357p5-3001.app.github.dev/api/comentarios/${postId}`);
            const data = await resp.json();
            setComentarios(data);
        };
        fetchComentarios();
    }, [postId]);

    const handleSubmit = async () => {
        const newComentario = {
            descripcion: nuevoComentario,
            likes: 0,
            post_id: postId,
            reader_id: 2, // temporal, ideal usar store.currentUser.id
        };

        const creado = await actions.agregarCommentario(newComentario);
        if (creado) {
            setComentarios([...comentarios, creado]);
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
                {comentarios.map(c => (
                    <li key={c.id} className="list-group-item d-flex justify-content-between">
                        <div>
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
