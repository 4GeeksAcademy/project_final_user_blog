import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Writer } from "../component/writer";
import WriterForm from "../component/writerForm";
import { Reader } from "../component/reader";
import ReaderForm from "../component/readerForm";
import { Post } from "../component/post";
import RegisterWriter from "../component/registerWriter";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center my-5">
  <div className="container p-4 shadow rounded bg-light" style={{ maxWidth: "600px" }}>
    <h3 className="mb-4">¿Quieres unirte a nuestra comunidad?</h3>
    <p className="mb-4">Regístrate como escritor o lector y comienza a explorar y compartir contenido único.</p>
    <div className="d-flex justify-content-center gap-4">
      <Link to="/register" className="btn btn-primary">
        Registro Writer
      </Link>
      <Link to="/register_reader" className="btn btn-secondary">
        Registro Reader
      </Link>
    </div>   
  </div>
</div>

	);
};
