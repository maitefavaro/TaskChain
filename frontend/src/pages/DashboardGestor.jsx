import React from "react";
import Logo from "../components/Logo";
import "../assets/GestorDashboard.css";
import { TasksByProjectsChart, EmployeeStatusChart } from "../components/DashboardCharts";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaTasks,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const nomeUsuario = localStorage.getItem("userName") || "Usuário";

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
  };

  const saudacao = getSaudacao();

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-container">
          <Logo />
        </div>
        <nav className="menu">
          <ul>
            <li onClick={() => navigate("/dashboard-gestor")}>
              <FaTachometerAlt /> Dashboard
            </li>
            <li onClick={() => navigate("/colaboradores")}>
              <FaUsers /> Colaboradores
            </li>
            <li onClick={() => navigate("/gerenciar-tarefas")}>
              <FaTasks /> Tarefas
            </li>
            <li onClick={() => navigate("/relatorios")}>
              <FaChartBar /> Relatórios
            </li>
          </ul>
        </nav>
        <div className="settings logout" onClick={handleLogout} style={{cursor: 'pointer', marginTop: 'auto'}}>
          <FaSignOutAlt /> Sair
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>{saudacao}, {nomeUsuario}!</h1>
          </div>
          <div className="profile-picture">
            <img src="https://i.pravatar.cc/40" alt="User" />
          </div>
        </header>

        <div className="dashboard-grid">
          <section className="tasks-by-projects card">
            <h3>Tasks by Projects</h3>
            <div className="chart-area">
              <TasksByProjectsChart />
            </div>
            <div className="legend">
              <span className="badge marketing">a</span> Marketing
              <span className="badge hr">b</span> HR
              <span className="badge dev">c</span> Developers
              <span className="badge design">d</span> Design
            </div>
          </section>

          <section className="employee-stats card">
            <ul>
              <li><span className="dot inactive"></span> Inactive: 254</li>
              <li><span className="dot active"></span> Active: 482</li>
              <li><span className="dot total"></span> Total: 736</li>
            </ul>
            <div className="chart-area">
              <EmployeeStatusChart />
            </div>
          </section>

          <section className="side-cards">
            <div className="card small-card">
              <h4>Top 10</h4>
              <p>Position in Dribble</p>
              <span>20% increase from last week</span>
            </div>
            <div className="card small-card">
              <h4>26</h4>
              <p>New Employees Onboarded</p>
              <span>15% increase from last month</span>
            </div>
            <div className="card small-card">
              <h4>500</h4>
              <p>New Clients Approached</p>
              <span>5% increase from last week</span>
            </div>
          </section>

          <section className="notifications card">
            <ul>
              <li><img src="https://i.pravatar.cc/30?img=1" alt="" /> Ellie joined team developers</li>
              <li><img src="https://i.pravatar.cc/30?img=2" alt="" /> Jenny joined team HR</li>
              <li><img src="https://i.pravatar.cc/30?img=3" alt="" /> Adam got employee of the month</li>
              <li><img src="https://i.pravatar.cc/30?img=4" alt="" /> Robert joined team design</li>
              <li><img src="https://i.pravatar.cc/30?img=5" alt="" /> Jack joined team design</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
