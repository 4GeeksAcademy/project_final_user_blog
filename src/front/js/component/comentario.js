// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../store/appContext";









// export const Comentario = ({postId}) => {
  
//     const [mostrarInput, setMostrarInput] = useState(null);
//     const [nuevoComentario, setNuevoComentario] = useState("");
//     const { store, actions } = useContext(Context);
//     console.log("hoola desde Comentario",store.comentario)
    

 

//     const handleSubmit = async (readerId = null) => {
//         if (nuevoComentario.trim() !== "") {
//             const newComentario = {
//                 descripcion: nuevoComentario,
//                 likes: 0,
//                 post_id: postId,
//                 reader_id: readerId
//             };
//             await actions.agregarCommentario(newComentario);
//             setNuevoComentario("");
//             setMostrarInput(null);
//             // const data = await actions.getAllComentaryByPostId(postId);
         
//         }
//     };

//     return (
//         <div className="mt-3">
//             <h6>Comentarios</h6>
//             <ul className="list-group">
//                 {store.comentario.map(c => (
//                     <li key={c.id} className="list-group-item d-flex justify-content-between align-items-start">
//                         <div>
//                             <p className="mb-1">{c.descripcion}</p>
//                             <small className="text-muted">Likes: {c.likes}</small>
//                             {mostrarInput === c.id && (
//                                 <div className="mt-2">
//                                     <textarea
//                                         className="form-control mb-2"
//                                         rows="2"
//                                         value={nuevoComentario}
//                                         onChange={(e) => setNuevoComentario(e.target.value)}
//                                         placeholder="Responder a este comentario..."
//                                     ></textarea>
//                                     <button className="btn btn-sm btn-primary" onClick={() => handleSubmit(c.id)}>Agregar Respuesta</button>
//                                 </div>
//                             )}
//                         </div>
//                         <div>
//                             <button className="btn btn-sm btn-outline-primary me-2">
//                                 <i className="fas fa-thumbs-up"></i>
//                             </button>
//                             <button
//                                 className="btn btn-sm btn-outline-success me-2"
//                                 onClick={() => setMostrarInput(c.id)}
//                             >
//                                 <i className="fas fa-comment"></i>
//                             </button>
//                             <button className="btn btn-sm btn-outline-danger">
//                                 <i className="fas fa-trash"></i>
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };




import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Comentario = ({ postId }) => {
    const [nuevoComentario, setNuevoComentario] = useState("");
    const { store, actions } = useContext(Context);
    console.log("hoola desde Comentario", store.comentario);
    console.log("hola reader desde comentario",store.reader.map(r=>r.id))
  

    const handleSubmit = async (readerId) => {
        if (nuevoComentario.trim() !== "") {
            const newComentario = {
                descripcion: nuevoComentario,
                likes: 0,
                post_id: postId,
                reader_id: readerId // Cambiado para que no sea una respuesta
            };
            await actions.agregarCommentario(newComentario);
            setNuevoComentario("");
        }
    };

    const handleDelete = async (commentId) => {
        await actions.eliminarComentario(commentId);
    };

    return (
        <div className="mt-3">
            <h6>Comentarios</h6>
            
           
            <div className="mb-3">
                <textarea
                    className="form-control mb-2"
                    rows="2"
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    placeholder="Escribe tu comentario..."
                ></textarea>
                <button 
                    className="btn btn-sm btn-primary"
                    onClick={()=>handleSubmit(2)}
                >
                    Agregar Comentario
                </button>
            </div>
            
            {/* Lista de comentarios */}
            <ul className="list-group">
                {store.comentario.map(c => (
                    <li key={c.id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div>
                            <p className="mb-1">{c.descripcion}</p>
                            <small className="text-muted">Likes: {c.likes}</small>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
