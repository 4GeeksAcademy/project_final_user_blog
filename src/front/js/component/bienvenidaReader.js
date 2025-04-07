import { useLocation } from 'react-router-dom';
import React from 'react';
import { Post } from './post';
import { Comment } from './comment';

 export const BienvenidaReader =()=> {
  const location = useLocation();
  const nombre = location.state?.nombre || 'Invitado';

  return (
    <div>
      <h1>¡Bienvenido reader, {nombre}!</h1>
      <p>Aqui puedes solo comentar.</p>



      <Comment/>
    </div>
  );
}
