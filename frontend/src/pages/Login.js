import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import Header from '../components/Header';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type === 'email' ? 'email' : 'senha']: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email, // username = email nesse caso
          password: formData.senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        // 👉 Buscar nome do usuário com o token
        const userResponse = await fetch('http://localhost:8000/api/usuario-logado/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        });

        const userData = await userResponse.json();
        localStorage.setItem('userName', userData.nome); // guarda nome!

        navigate('/dashboard');
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-left">
          <h2>Bem-vindo(a) de volta!</h2>
          <p>Caso não tenha uma conta, cadastre-se aqui!</p>
          <button onClick={() => navigate('/register')}>Cadastre-se</button>
        </div>
        <div className="login-right">
          <div className="login-form-box">
            <h2>Entrar</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
              />
              <button type="submit">Entrar</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
