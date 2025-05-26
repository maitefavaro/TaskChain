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
  const [userType, setUserType] = useState('funcionario'); // 'gestor' ou 'funcionario'
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type === 'email' ? 'email' : 'senha']: e.target.value,
    });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          password: formData.senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        const userResponse = await fetch('http://localhost:8000/api/usuario-logado/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        });

        const userData = await userResponse.json();
        localStorage.setItem('userName', userData.nome);

        const isGestor = userData.is_gerente;

        if (userType === 'gestor' && isGestor) {
          navigate('/dashboard-gestor');
        } else if (userType === 'funcionario' && !isGestor) {
          navigate('/dashboard-funcionario');
        } else {
          setError(`Usuário não tem permissão para acessar como ${userType}`);
        }
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

            {/* Custom Radio Buttons */}
            <div className="user-type-container">
              <label className="custom-radio">
                <input
                  type="radio"
                  value="gestor"
                  checked={userType === 'gestor'}
                  onChange={handleUserTypeChange}
                />
                <span>Gestor</span>
              </label>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="funcionario"
                  checked={userType === 'funcionario'}
                  onChange={handleUserTypeChange}
                />
                <span>Funcionário</span>
              </label>
            </div>

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
