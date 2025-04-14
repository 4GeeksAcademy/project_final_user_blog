import { useLocation } from 'react-router-dom';
import React from 'react';
import { CommentReader } from './commentReader';

 export const BienvenidaReader =()=> {
  const location = useLocation();
  const nombre = location.state?.nombre || 'Invitado';

  return (
    <div>
      <h1>¡Bienvenido , Reader {nombre}!</h1>
      <p>Aqui puedes solo comentar.</p>



      <CommentReader/>
    </div>
  );
}
