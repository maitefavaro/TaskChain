import React from "react";
import { FaUsers, FaTachometerAlt, FaTasks, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import "../assets/Colaboradores.css";

const colaboradoresMock = [
  { id: 1, nome: "Ana Silva", cargo: "Desenvolvedora", status: "Ativo" },
  { id: 2, nome: "Carlos Souza", cargo: "Designer", status: "Inativo" },
  { id: 3, nome: "Beatriz Lima", cargo: "Gerente de Projeto", status: "Ativo" },
  // ... outros colaboradores
];

const Colaboradores = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-container">
          <Logo />
        </div>
        <nav className="menu">
          <ul>
            <li onClick={() => navigate("/dashboard-gestor")}><FaTachometerAlt /> Dashboard</li>
            <li className="active"><FaUsers /> Colaboradores</li>
            <li onClick={() => navigate("/gerenciar-tarefas")}><FaTasks /> Tarefas</li>
            <li onClick={() => navigate("/relatorios")}><FaChartBar /> Relatórios</li>
          </ul>
        </nav>
        <div className="settings logout" onClick={handleLogout} style={{ cursor: "pointer", marginTop: "auto" }}>
          <FaSignOutAlt /> Sair
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Colaboradores</h1>
        </header>

        <section className="collaborators-list card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {colaboradoresMock.map((colab) => (
                <tr key={colab.id}>
                  <td>{colab.nome}</td>
                  <td>{colab.cargo}</td>
                  <td className={colab.status.toLowerCase()}>{colab.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Colaboradores;
