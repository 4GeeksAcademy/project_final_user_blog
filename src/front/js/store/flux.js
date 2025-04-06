const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			writer: [
				
			],
			reader: [
				
			],
			post: [
				
			],
			comentario: [
				
			],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			agregarWriter: async (writerData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/writers", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(writerData)
					});
			
					if (!resp.ok) throw new Error("Error al agregar writer");
			
					const data = await resp.json();
			
					// opcional: actualizar el store
					const store = getStore();
					setStore({ writer: [...store.writer, data] });
			
					return data;
				} catch (error) {
					console.error("Error al agregar writer:", error);
				}
			},
			agregarReader: async (readerData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/readers", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(readerData)
					});
			
					if (!resp.ok) throw new Error("Error al agregar escritor");
			
					const data = await resp.json();
			
					// opcional: actualizar el store
					const store = getStore();
					setStore({ reader: [...store.reader, data] });
			
					return data;
				} catch (error) {
					console.error("Error al agregar writer:", error);
				}
			},
			updateWriter: async (writer_id, updatedData) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/writers/${writer_id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(updatedData)
					});
			
					if (!resp.ok) throw new Error("Error al actualizar el writer");
			
					const data = await resp.json();
			
					// Actualizar el store
					const store = getStore();
					const updatedWriters = store.writer.map(w =>
						w.id === writer_id ? data : w
					);
					setStore({ writer: updatedWriters });
			
					return data;
				} catch (error) {
					console.error("Error al actualizar writer:", error);
				}
			},
			updateReader: async (reader_id, updatedData) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/readers/${reader_id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(updatedData)     
					});
			
					if (!resp.ok) throw new Error("Error al actualizar el reader");
			
					const data = await resp.json();
			
					// Actualizar el store
					const store = getStore();
					const updatedReaders = store.reader.map(reader =>
						reader.id === reader_id ? data : reader
					);
					setStore({ reader: updatedReaders });
			
					return data;
				} catch (error) {
					console.error("Error al actualizar lector:", error);
				}
			},
			eliminarWriter:async (writer_id) => {
				
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/writers/${writer_id}`,{
						method:"DELETE"
					})
					
					if (!resp.ok) {  
						throw new Error("Error al eliminar el escritor");
					}
			
					const data = await resp.json();
			
					
					const store = getStore();
					const updatedWriters = store.writer.filter(w => w.id !== writer_id);
					setStore({ writer: updatedWriters });
			
					return data;
					
					
					// don't forget to return something, that is how the async resolves
					
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			eliminarReader:async (reader_id) => {
				
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/readers/${reader_id}`,{
						method:"DELETE"
					})
					
					if (!resp.ok) {  
						throw new Error("Error al eliminar el lector");
					}
			
					const data = await resp.json();
			
					
					const store = getStore();
					const updatedReaders = store.reader.filter(r => r.id !== reader_id);
					setStore({ reader: updatedReaders });
			
					return data;
					
					
					// don't forget to return something, that is how the async resolves
					
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			agregarCommentario: async (comentData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/comentarios", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(comentData)
					});
			
					if (!resp.ok) throw new Error("Error al agregar comentario");
			
					const data = await resp.json();
			
					// opcional: actualizar el store
					const store = getStore();
					setStore({ comentario: [...store.comentario, data] });
			
					return data;
				} catch (error) {
					console.error("Error al agregar :", error);
				}
			},
			getAllComentaryByPostId: async (postId) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `posts/comentarios${postId}`, {
						method: "GET",
						
					});
			
					if (!resp.ok) throw new Error("Error al obtener comentario");
			
					const data = await resp.json();
			
					// opcional: actualizar el store
					const store = getStore();
					setStore({ comentario: data });
			
					return data;
				} catch (error) {
					console.error("Error al agregar :", error);
				}
			},
			eliminarComentario:async (comentario_id) => {
				
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/comentarios/${comentario_id}`,{
						method:"DELETE"
					})
					
					if (!resp.ok) {  
						throw new Error("Error al eliminar el comentario");
					}
			
					const data = await resp.json();
			
					
					const store = getStore();
					const updatedComentarios = store.comentario.filter(c => c.id !== comentario_id);
					setStore({ comentario: updatedComentarios });
			
					return data;
					
					
					// don't forget to return something, that is how the async resolves
					
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/writers")
					const data = await resp.json()
					setStore({ writer: data })
					
					
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getReader: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/readers")
					const data = await resp.json()
					setStore({ reader: data })
					
					
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getPost: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/posts")
					const data = await resp.json()
					setStore({ post: data })
					
					
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getCommentario: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/comentarios")
					const data = await resp.json()
					setStore({ comentario: data })
					
					
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
