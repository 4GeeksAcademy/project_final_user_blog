// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Context } from "../store/appContext"; 

// const LoginReader=()=> {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [mensaje, setMensaje] = useState('');
//   const navigate = useNavigate();
//   const { store,actions } = useContext(Context)
//   console.log("holatoken desde",store.token)
//   console.log("holatoken desdecu",store.currenUser)

  

//   const handleSubmit = async (e) => {    
//     e.preventDefault();
  
//     const data = await actions.LoginReader({ email, password });
  
//     if (data && data.access_token) {
//       navigate('/bienvenido', { state: { nombre: data.reader.first_name } });
//     } else {
//       setMensaje("Credenciales inválidas");
//     }
//   };
  

//   return (
//     <div className="login">
//       <h2>Iniciar Sesión de reader</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Correo"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Entrar</button>
//       </form>  
//       {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
    
//     </div>
//   );
// }


// export default LoginReader





import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await actions.LoginReader({ email, password });

    if (user) {
      navigate('/bienvenido', { state: { nombre: user.reader.first_name } });
      alert("has iniciado session correctamente")
    } else {
      setMensaje("Credenciales incorrectas");
    }   
  };

  return (
    <div className="container my-5 p-4 shadow rounded bg-light" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">Entrar</button>
        </div>
        <div className="text-center">
          ¿No tienes una cuenta? <Link to="/register_reader">Regístrate aquí</Link>
        </div>
      </form>
      {mensaje && <p className="text-danger mt-3 text-center">{mensaje}</p>}
    </div>
  ); 
};

export default Login;
