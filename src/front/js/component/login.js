

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'; // Asegúrate que la ruta esté correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await actions.loginWriter({ email, password });

    if (user) {
      navigate('/bienvenida', { state: { nombre: user.writer.first_name } });
    } else {
      setMensaje("Credenciales incorrectas");
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
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
};

export default Login;
