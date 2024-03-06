import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/GameProvider";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login, state: {isAuthenticated, loginError}} = useAuth();
    const navigate = useNavigate();
  
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/');
      }
      if (loginError) {
        setError(loginError);
      }
    }, [isAuthenticated, loginError, navigate]);
  
    useEffect(() => {
      setError('');
    }, [email, password]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        setError('Por favor, ingrese el usuario y la contraseña');
        return;
      }
  
  
      login(email, password);
    };
  
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          <div className="form-control">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <div className='form-control'>
            {error && <div className='form-error'>Usuario o contraseña incorrecta</div>}
            <button type="submit">
              <span class="icon">👆</span> 
            </button>
          </div>
          <div className='link-container'>
            <Link to="/registro" className='link'>¿No tienes cuenta? Registraté</Link>
          </div>
        </form>
      </div>
    );
  }
  
  export default Login;