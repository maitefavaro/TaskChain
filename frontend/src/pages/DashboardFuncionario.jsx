import React, { useState } from "react";
import Logo from "../components/Logo";
import "../assets/DashboardFuncionario.css";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardFuncionario = () => {
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

  // Dados fake para visualizações e listas
  const projetos = [
    { id: 1, nome: "Marketing", tarefas: 34, concluídas: 20 },
    { id: 2, nome: "RH", tarefas: 22, concluídas: 15 },
    { id: 3, nome: "Desenvolvimento", tarefas: 50, concluídas: 35 },
    { id: 4, nome: "Design", tarefas: 18, concluídas: 10 },
  ];

  const tarefasPendentes = [
    {
      id: 101,
      titulo: "Revisar contrato com fornecedor",
      prazo: "2025-05-22",
      prioridade: "Alta",
    },
    {
      id: 102,
      titulo: "Atualizar manual do usuário",
      prazo: "2025-05-23",
      prioridade: "Média",
    },
    {
      id: 103,
      titulo: "Enviar relatório financeiro",
      prazo: "2025-05-25",
      prioridade: "Alta",
    },
    {
      id: 104,
      titulo: "Planejar reunião de equipe",
      prazo: "2025-05-27",
      prioridade: "Baixa",
    },
  ];

  const notificacoes = [
    { id: 1, texto: "Nova tarefa atribuída: Revisar relatório", hora: "2h atrás" },
    { id: 2, texto: "Projeto Design atualizado", hora: "5h atrás" },
    { id: 3, texto: "Reunião com o time amanhã às 10h", hora: "1 dia atrás" },
  ];

  // ------------------ NOVO: dados do desempenho do funcionário ------------------
  const desempenhoMeses = [
    { mes: "Jan", tarefasConcluidas: 12 },
    { mes: "Fev", tarefasConcluidas: 15 },
    { mes: "Mar", tarefasConcluidas: 10 },
    { mes: "Abr", tarefasConcluidas: 18 },
    { mes: "Mai", tarefasConcluidas: 20 },
  ];

  const maxDesempenho = Math.max(...desempenhoMeses.map((d) => d.tarefasConcluidas));

  const desempenhoResumo = {
    totalTarefas: 105,
    tarefasConcluidas: 80,
    tarefasPendentes: 25,
    produtividadePercent: Math.round((80 / 105) * 100),
  };

  const maxTarefas = Math.max(...projetos.map((p) => p.tarefas));

  // NOVOS DADOS para as seções pedidas:
  const metaSemanal = "Completar 5 tarefas importantes e revisar relatórios até sexta-feira.";

  const dicaDoDia = "Organize suas tarefas por prioridade para melhorar sua produtividade.";

  const conquistas = [
    "Concluiu 100 tarefas no último mês",
    "Participou de 3 treinamentos de capacitação",
    "Atingiu 95% de satisfação dos clientes",
  ];

  const minhasPrioridadesHoje = [
    "Enviar o relatório financeiro",
    "Participar da reunião com o time de desenvolvimento",
    "Revisar o contrato com fornecedor",
  ];

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-container">
          <Logo />
        </div>
        <nav className="menu">
          <ul>
            <li className="active" onClick={() => navigate("/dashboard")}>
              <FaTachometerAlt /> Dashboard
            </li>

            <li onClick={() => navigate("/projects")}>
              <FaTasks /> Minhas Tarefas
            </li>
          </ul>
        </nav>
        <div className="settings" onClick={() => navigate("/settings")}>
          <FaCog /> Configurações
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>
              {saudacao}, <span className="username">{nomeUsuario}</span>!
            </h1>
            <p className="welcome-text">Confira suas atividades e atualizações recentes.</p>
          </div>
          <div className="profile-picture">
            <img src="https://i.pravatar.cc/60" alt="User" />
          </div>
        </header>

        <section className="cards-grid">
          {/* Tarefas por Projeto */}
          <article className="card tasks-projects">
            <h3>Tarefas por Projeto</h3>
            <svg width="100%" height="160" style={{ marginTop: 12 }}>
              {projetos.map(({ id, nome, tarefas }, i) => {
                const barHeight = (tarefas / maxTarefas) * 100;
                return (
                  <rect
                    key={id}
                    x={i * 60 + 20}
                    y={120 - barHeight}
                    width={40}
                    height={barHeight}
                    fill="#f38375"
                    rx="6"
                    ry="6"
                  />
                );
              })}
              {/* Labels */}
              {projetos.map(({ id, nome }, i) => (
                <text
                  key={`label-${id}`}
                  x={i * 60 + 40}
                  y={140}
                  fontSize="12"
                  fill="#555"
                  textAnchor="middle"
                >
                  {nome}
                </text>
              ))}
            </svg>
          </article>

          {/* Seu Desempenho */}
          <article className="card employee-stats" style={{ paddingBottom: 8 }}>
            <h3>Seu Desempenho</h3>

            <ul className="status-list" style={{ marginBottom: 16 }}>
              <li>
                <strong>Total de Tarefas:</strong> {desempenhoResumo.totalTarefas}
              </li>
              <li>
                <strong>Tarefas Concluídas:</strong> {desempenhoResumo.tarefasConcluidas}
              </li>
              <li>
                <strong>Tarefas Pendentes:</strong> {desempenhoResumo.tarefasPendentes}
              </li>
              <li>
                <strong>Produtividade:</strong> {desempenhoResumo.produtividadePercent}%
              </li>
            </ul>

            <svg width="100%" height="120" style={{ marginTop: 12 }}>
              {desempenhoMeses.map(({ mes, tarefasConcluidas }, i) => {
                const barHeight = (tarefasConcluidas / maxDesempenho) * 80;
                return (
                  <rect
                    key={mes}
                    x={i * 50 + 25}
                    y={100 - barHeight}
                    width={30}
                    height={barHeight}
                    fill="#f38375"
                    rx="4"
                    ry="4"
                  />
                );
              })}
              {/* Labels */}
              {desempenhoMeses.map(({ mes }, i) => (
                <text
                  key={`label-desempenho-${mes}`}
                  x={i * 50 + 40}
                  y={115}
                  fontSize="11"
                  fill="#555"
                  textAnchor="middle"
                >
                  {mes}
                </text>
              ))}
            </svg>
          </article>

          {/* Tarefas Pendentes */}
          <article className="card pending-tasks">
            <h3>Tarefas Pendentes</h3>
            {tarefasPendentes.map(({ id, titulo, prazo, prioridade }) => (
              <div
                key={id}
                className="pending-task-item"
                style={{
                  backgroundColor:
                    prioridade === "Alta"
                      ? "#fcdede"
                      : prioridade === "Média"
                      ? "#fff1e6"
                      : "#e7f5ff",
                  borderLeft: `6px solid ${
                    prioridade === "Alta"
                      ? "#d32f2f"
                      : prioridade === "Média"
                      ? "#f57c00"
                      : "#2196f3"
                  }`,
                  padding: "8px 12px",
                  borderRadius: "6px",
                  marginBottom: 8,
                }}
              >
                <h4>{titulo}</h4>
                <p>
                  Prazo: <strong>{prazo}</strong> - Prioridade: <strong>{prioridade}</strong>
                </p>
              </div>
            ))}
          </article>

          {/* Notificações */}
          <article className="card notifications">
            <h3>
              <FaBell style={{ marginRight: 6 }} />
              Notificações
            </h3>
            <ul>
              {notificacoes.map(({ id, texto, hora }) => (
                <li key={id}>
                  <FaCheckCircle style={{ color: "#4caf50", marginRight: 8 }} />
                  {texto} <span className="notification-time">{hora}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* ---------- NOVAS SEÇÕES ---------- */}

          {/* Meta Semanal Pessoal */}
          <article className="card weekly-goal">
            <h3>✅ Meta Semanal Pessoal</h3>
            <p>{metaSemanal}</p>
          </article>

          {/* Dica do Dia */}
          <article className="card tip-of-day">
            <h3>🧠 Dica do Dia</h3>
            <p>{dicaDoDia}</p>
          </article>

          {/* Conquistas */}
          <article className="card achievements">
            <h3>🏅 Conquistas</h3>
            <ul>
              {conquistas.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </article>

          {/* Minhas Prioridades Hoje */}
          <article className="card my-priorities">
            <h3>🎯 Minhas Prioridades Hoje</h3>
            <ol>
              {minhasPrioridadesHoje.map((tarefa, index) => (
                <li key={index}>{tarefa}</li>
              ))}
            </ol>
          </article>
        </section>
      </main>
    </div>
  );
};

export default DashboardFuncionario;
