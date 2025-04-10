import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import WriterEditor from "./writerEditor";
import { Button } from "react-bootstrap";
import WriterForm from "./writerForm";



		
		
	export const Writer = () => {
	const { store, actions } = useContext(Context);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedWriter, setSelectedWriter] = useState(null);

    const handleEdit = (writer) => {
        setSelectedWriter(writer);
        setShowEditModal(true);    
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Escritores</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>
                Agregar Escritor
            </button>
            <ul className="list-group">
                {store.writer.map((w) => (
                    <li key={w.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {w.first_name} {w.last_name}
                        <div>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(w)}>
                                Editare
                            </button>
                            <button className="btn btn-danger" onClick={() => actions.eliminarWriter(w.id)}>
                                Eliminar
                            </button>
                        </div>
                    </li>



                ))}
            </ul>

            {/* Modal para editar escritor */}
            {selectedWriter && (
                <WriterEditor
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    writer={selectedWriter}
                    actions={actions}
					
                />
            )}

          
            <WriterForm show={showAddModal} handleClose={() => setShowAddModal(false)} actions={actions} />
        </div>
    );
};

