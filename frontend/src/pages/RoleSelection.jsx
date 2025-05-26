import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Home.css';
import Header from '../components/Header';
import kanbanImg from '../assets/kanban-girl.png'; // imagem ilustrativa

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-image-box">
          <img src={kanbanImg} alt="Ilustração TaskChain" className="home-illustration" />
        </div>

        <div className="home-box">
          <h1 className="home-title">Bem-vinda ao TaskChain</h1>
          <p className="home-subtitle">Organize suas tarefas com estilo</p>

          <div className="home-buttons">
            <Link to="/login-gestor" className="home-button">Gestor</Link>
            <Link to="/login-funcionario" className="home-button-outline">Funcionário</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
