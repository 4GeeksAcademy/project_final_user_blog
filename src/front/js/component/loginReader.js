import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginReader=()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://upgraded-trout-r56pvr9vgrg357p5-3001.app.github.dev/api/readers/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
       
        navigate('/bienvenido', { state: { nombre: data.reader.first_name } });
      } else {
        setMensaje(data.message);
      }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión de reader</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
    
    </div>
  );
}


export default LoginReader