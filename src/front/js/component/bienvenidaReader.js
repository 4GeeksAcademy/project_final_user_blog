import { useLocation } from 'react-router-dom';
import React from 'react';
import { Post } from './post';

 export const BienvenidaReader =()=> {
  const location = useLocation();
  const nombre = location.state?.nombre || 'Invitado';

  return (
    <div>
      <h1>¡Bienvenido, {nombre}!</h1>
      <p>Has iniciado sesión correctamente.</p>



      <Post/>
    </div>
  );
}
