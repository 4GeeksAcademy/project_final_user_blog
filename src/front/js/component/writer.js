import React, { useContext } from "react";
import { Context } from "../store/appContext";
import WriterEditor from "./writerEditor";


export const Writer = () => {
    const { store, actions } = useContext(Context);
    console.log("hola desde writer",store.writer)


    return ( 

    <div> 

{
    store.writer.map(w=> <li key={w.id}> { w.first_name} 
    <button onClick={()=>actions.eliminarWriter(w.id)} > eliminar</button>
    <WriterEditor  writer={w}/>
     </li>)
}
           
        </div>
    );
};
