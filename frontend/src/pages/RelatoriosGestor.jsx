import React, { useState } from "react";
import Logo from "../components/Logo";
import {
  FaTachometerAlt,
  FaUsers,
  FaTasks,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "chartjs-plugin-datalabels"; // Plugin para mostrar labels

import "../assets/GestorRelatorios.css";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const RelatoriosGestor = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleCard = (card) => {
    setActiveCard(activeCard === card ? null : card);
  };

  // Dados para o gráfico "Total de Tarefas"
  const tarefasData = {
    labels: ["Marketing", "RH", "Desenvolvimento", "Design"],
    datasets: [
      {
        label: "Número de tarefas",
        data: [220, 180, 300, 120],
        backgroundColor: ["#f38375", "#f7a98e", "#fcaea9", "#fcd6d2"],
      },
    ],
  };

  // Opções para mostrar os números dentro das barras
  const tarefasOptions = {
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "top",
        color: "#333",
        font: { weight: "bold" },
        formatter: (value) => value,
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 50 } },
    },
    maintainAspectRatio: false,
  };

  // Dados para o gráfico "Tarefas Concluídas"
  const concluidasData = {
    labels: ["Hoje", "Essa Semana", "Esse Mês"],
    datasets: [
      {
        label: "Tarefas Concluídas",
        data: [12, 80, 210],
        backgroundColor: ["#f38375", "#f7a98e", "#fcaea9"],
      },
    ],
  };

  const concluidasOptions = {
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "#333",
        font: { weight: "bold" },
        formatter: (value) => value,
      },
    },
    maintainAspectRatio: false,
  };

  // Dados para o gráfico "Projetos Ativos" (Pie chart)
  const projetosData = {
    labels: ["Campanha Primavera", "Nova Plataforma Web", "Redesign de Marca"],
    datasets: [
      {
        label: "Projetos",
        data: [5, 4, 3],
        backgroundColor: ["#f38375", "#f7a98e", "#fcaea9"],
      },
    ],
  };

  const projetosOptions = {
    plugins: {
      legend: { position: "bottom" },
      datalabels: {
        color: "#333",
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}: ${value}`;
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Dados para o gráfico "Colaboradores Ativos" (Bar chart)
  const colaboradoresData = {
    labels: ["Dev", "Design", "RH", "Marketing"],
    datasets: [
      {
        label: "Colaboradores",
        data: [10, 8, 6, 10],
        backgroundColor: ["#f38375", "#f7a98e", "#fcaea9", "#fcd6d2"],
      },
    ],
  };

  const colaboradoresOptions = {
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "#333",
        font: { weight: "bold" },
        formatter: (value) => value,
      },
    },
    scales: {
      y: { beginAtZero: true, stepSize: 2 },
    },
    maintainAspectRatio: false,
  };

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
        <div
          className="settings logout"
          onClick={handleLogout}
          style={{ cursor: "pointer", marginTop: "auto" }}
        >
          <FaSignOutAlt /> Sair
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Relatórios</h1>
        </header>

        <section className="relatorio-cards">
          {/* Card Total de Tarefas */}
          <div
            className={`relatorio-card ${
              activeCard === "tarefas" ? "active" : ""
            }`}
            onClick={() => toggleCard("tarefas")}
            style={{ minHeight: "350px" }}
          >
            <h3>Total de Tarefas</h3>
            <p>820</p>
            {activeCard === "tarefas" && (
              <div className="card-details" style={{ height: "220px" }}>
                <Bar data={tarefasData} options={tarefasOptions} />
              </div>
            )}
          </div>

          {/* Card Tarefas Concluídas */}
          <div
            className={`relatorio-card ${
              activeCard === "concluidas" ? "active" : ""
            }`}
            onClick={() => toggleCard("concluidas")}
            style={{ minHeight: "350px" }}
          >
            <h3>Tarefas Concluídas</h3>
            <p>645</p>
            {activeCard === "concluidas" && (
              <div className="card-details" style={{ height: "220px" }}>
                <Bar data={concluidasData} options={concluidasOptions} />
              </div>
            )}
          </div>

          {/* Card Projetos Ativos */}
          <div
            className={`relatorio-card ${
              activeCard === "projetos" ? "active" : ""
            }`}
            onClick={() => toggleCard("projetos")}
            style={{ minHeight: "350px" }}
          >
            <h3>Projetos Ativos</h3>
            <p>12</p>
            {activeCard === "projetos" && (
              <div className="card-details" style={{ height: "220px" }}>
                <Pie data={projetosData} options={projetosOptions} />
              </div>
            )}
          </div>

          {/* Card Colaboradores Ativos */}
          <div
            className={`relatorio-card ${
              activeCard === "colaboradores" ? "active" : ""
            }`}
            onClick={() => toggleCard("colaboradores")}
            style={{ minHeight: "350px" }}
          >
            <h3>Colaboradores Ativos</h3>
            <p>34</p>
            {activeCard === "colaboradores" && (
              <div className="card-details" style={{ height: "220px" }}>
                <Bar data={colaboradoresData} options={colaboradoresOptions} />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RelatoriosGestor;
