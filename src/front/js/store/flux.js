const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			writer: [
				
			]
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
					const updatedWriters = store.writer.map(writer =>
						writer.id === writer_id ? data : writer
					);
					setStore({ writer: updatedWriters });
			
					return data;
				} catch (error) {
					console.error("Error al actualizar writer:", error);
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
