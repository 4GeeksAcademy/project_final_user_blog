

const getState = ({ getStore, getActions, setStore }) => {
	 
	return {
		store: {
			currentUser:null,
			token:null,
			currentUser1:null,
			token1:null,
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
					const resp = await fetch(process.env.BACKEND_URL + "/writers", {
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
			setTokenAndUser: (token, user) => {
				setStore({
					token: token,
					currentUser: user
				});
			},
			setTokenAndUser1: (token, user) => {
				setStore({
					token1: token,
					currentUser1: user
				});
			},
			
			agregarReader: async (readerData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/readers", {
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
					const resp = await fetch(process.env.BACKEND_URL + `/writers/${writer_id}`,{
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
					const store = getStore(); // obtenemos el token del store
			
					const resp = await fetch(process.env.BACKEND_URL + "/comentarios", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token // 🔥 Aquí va el token
						},
						body: JSON.stringify(comentData)
					});
			       
					if (!resp.ok) throw new Error("Error al agregar comentario");
			
					const data = await resp.json();
			
					// opcional: actualizar el store
					setStore({ comentario: [...store.comentario, data] });
			
					return data;
				} catch (error) {
					console.error("Error al agregar :", error);
					alert("Debes iniciar sesión para comentar."); // por si falla por no tener token
					return null;
				}
			},
			
			getAllComentaryByPostId: async (postId) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/comentarios/${postId}`, {
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
					const resp = await fetch(process.env.BACKEND_URL + `/comentarios/${comentario_id}`,{
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
			agregarPost: async (postData) => {
				try {
					const store = getStore(); // obtener token guardado
					const resp = await fetch(process.env.BACKEND_URL + "/posts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token1 // 👈 Manda el token
						},
						body: JSON.stringify(postData)
					});
			
					if (!resp.ok) throw new Error("No se pudo crear el post");
			
					const data = await resp.json();
			
					// actualizar el store opcionalmente
					setStore({ post: [...store.post, data] });
			
					return data;
				} catch (error) {
					console.error("Error al crear post:", error);
					alert("Debes iniciar sesión para publicar.");
					return null;
				}
			},
			
			  
			
   
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/writers")
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
					const resp = await fetch(process.env.BACKEND_URL + "/readers")
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
					const resp = await fetch(process.env.BACKEND_URL + "/posts")
					const data = await resp.json()
					setStore({ post: data })
					
					
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			setCurrentUser: (user) => {
				setStore({ currentUser: user });
			  },
			setCurrentUser1: (user) => {
				setStore({ currentUser1: user });
			  },
			  
			getCommentario: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/comentarios")
					const data = await resp.json()
					setStore({ comentario: data })
					
					
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
		
			LoginReader: async (credentials) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/readers/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(credentials)
					});
			
					if (!resp.ok) throw new Error("Credenciales inválidas");
			
					const data = await resp.json();
			
					localStorage.setItem("token", data.access_token); // ← 🧠 guarda el token
					localStorage.setItem("currentUser", JSON.stringify(data.reader)); // ← 🧠 opcional: guarda usuario
			
					setStore({
						token: data.access_token,
						currentUser: data.reader
					});  
			
					return data;
				} catch (err) {
					console.error("Error de login:", err);
					return null;
				}
			},
			loginWriter: async (credentials) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/writers/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(credentials)
					});
			
					if (!resp.ok) throw new Error("Credenciales inválidas");
			
					const data = await resp.json();
			
					localStorage.setItem("token1", data.access_token); // ← 🧠 guarda el token
					localStorage.setItem("currentUser1", JSON.stringify(data.writer)); // ← 🧠 opcional: guarda usuario
			
					setStore({
						token1: data.access_token,
						currentUser1: data.writer
					});  
			
					return data;
				} catch (err) {
					console.error("Error de login:", err);
					return null;
				}
			},
			agregarPost: async (postData) => {
				try {
					const store = getStore();
					const resp = await fetch(`${process.env.BACKEND_URL}/posts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token1
						},
						body: JSON.stringify(postData)
					});
			
					if (!resp.ok) throw new Error("Error al agregar el post");
			
					const data = await resp.json();
			
					// Agregar el nuevo post al store
					setStore({ post: [...store.post, data] });
			
					return data;
				} catch (error) {
					console.error("Error al crear post:", error);
					alert("Debes iniciar sesión para crear un post.");
					return null;
				}
			},
			logoutWriter: () => {
				// Eliminar token e info de usuario del localStorage
				localStorage.removeItem("token");
				localStorage.removeItem("currentUser");
			
				// Limpiar el store también
				setStore({
					token: null,
					currentUser: null
				});
			},
			
			
			// eliminarPost: async (postId) => {
			// 	try {
			// 		const store = getStore();
			// 		const resp = await fetch(process.env.BACKEND_URL + `/posts/${postId}`, {
			// 			method: "DELETE",
						
			// 		});
			
			// 		if (!resp.ok) throw new Error("Error al eliminar el post");
			// 		const data  = await resp.json()
			
			// 		// Eliminar el post del store
			// 		const actualizados = store.post.filter(p => p.id !== postId);
			// 		setStore({ post: actualizados });
			// 		return data
			// 	} catch (error) {
			// 		console.error("Error al eliminar post:", error);
			// 		alert("Ocurrió un error al intentar eliminar el post.");
			// 	}
			// },
			eliminarPost: async (postId) => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + `/posts/${postId}`, {
						method: "DELETE",
						headers: {
							"Authorization": "Bearer " + store.token1 // 👈 Manda el token
						}
					});
			
					if (!resp.ok) throw new Error("Error al eliminar el post");
			
					const data = await resp.json();
			
					// Eliminar el post del store
					const actualizados = store.post.filter(p => p.id !== postId);
					setStore({ post: actualizados });
			
					return data;
				} catch (error) {
					console.error("Error al eliminar post:", error);
					alert("Ocurrió un error al intentar eliminar el post.");
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
