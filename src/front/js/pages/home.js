import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Writer } from "../component/writer";
import WriterForm from "../component/writerForm";
import { Reader } from "../component/reader";
import ReaderForm from "../component/readerForm";
import { Post } from "../component/post";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
		<h1>hola mundo</h1>
		
		</div>
	);
};
