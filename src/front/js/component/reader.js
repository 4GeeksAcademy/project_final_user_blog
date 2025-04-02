

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import WriterEditor from "./writerEditor";
import { Button } from "react-bootstrap";
import WriterForm from "./writerForm";
import ReaderForm from "./readerForm";
import { ReaderEditor } from "./readerEditor";



		
		
	export const Reader = () => {
	const { store, actions } = useContext(Context);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedWriter, setSelectedWriter] = useState(null);

    const handleEdit = (reader) => {
        setSelectedWriter(reader);
        setShowEditModal(true);    
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de lectotes</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>
                Agregar Lector
            </button>
            <ul className="list-group">
                {store.reader.map((r) => (
                    <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {r.first_name} {r.last_name}
                        <div>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(r)}>
                                Editare
                            </button>
                            <button className="btn btn-danger" onClick={() => actions.eliminarReader(r.id)}>
                                Eliminar
                            </button>
                        </div>
                    </li>



                ))}
            </ul>

            {/* Modal para editar escritor */}
            {selectedWriter && (
                <ReaderEditor
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    reader={selectedWriter}
                    actions={actions}
					
                />
            )}

            {/* Modal para agregar escritor */}
            <ReaderForm show={showAddModal} handleClose={() => setShowAddModal(false)} actions={actions} />
        </div>
    );
};