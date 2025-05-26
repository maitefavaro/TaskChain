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
          <h1 className="home-title">Bem-vindo(a) ao TaskChain</h1>
          <p className="home-subtitle">Organize suas tarefas com estilo</p>

          <div className="home-buttons">
            <Link to="/login" className="home-button">Login</Link>
            <Link to="/register" className="home-button-outline">Registrar</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
