import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const WriterEditor = ({ writer }) => {
	const { actions } = useContext(Context);

	const [formData, setFormData] = useState({
		first_name: writer.first_name,
		last_name: writer.last_name,
		email: writer.email
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleUpdate = async () => {
		await actions.updateWriter(writer.id, formData);
		alert("Escritor actualizado");
	};

	return (
		<div className="card p-3 mb-3 shadow-sm">
			<h5>Editar escritor</h5>
			<div className="row">
				<div className="col-md-4">
					<input
						type="text"
						className="form-control mb-2"
						name="first_name"
						value={formData.first_name}
						onChange={handleChange}
						placeholder="Nombre"
					/>
				</div>
				<div className="col-md-4">
					<input
						type="text"
						className="form-control mb-2"
						name="last_name"
						value={formData.last_name}
						onChange={handleChange}
						placeholder="Apellido"
					/>
				</div>
				<div className="col-md-4">
					<input
						type="email"
						className="form-control mb-2"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Correo"
					/>
				</div>
			</div>
			<button className="btn btn-success mt-2" onClick={handleUpdate}>
				Guardar cambios
			</button>
		</div>
	);
};

export default WriterEditor;
