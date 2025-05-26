import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import {
  FaTachometerAlt,
  FaUsers,
  FaTasks,
  FaChartBar,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import "../assets/GestorTarefas.css";

const GestorTarefas = () => {
  const navigate = useNavigate();

  const colaboradoresMock = [
    { id: 1, nome: "Ana Silva" },
    { id: 2, nome: "Bruno Souza" },
    { id: 3, nome: "Carla Pereira" },
  ];

  const [tarefas, setTarefas] = useState([
    { id: 1, titulo: "Revisar relatório mensal", status: "Pendente", colaboradorId: 1, gestorId: 99 },
    { id: 2, titulo: "Aprovar orçamento do projeto X", status: "Em andamento", colaboradorId: 2, gestorId: 99 },
    { id: 3, titulo: "Reunião com equipe de desenvolvimento", status: "Concluída", colaboradorId: null, gestorId: 99 },
  ]);

  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);
  const [novaTarefaTitulo, setNovaTarefaTitulo] = useState("");
  const [novaTarefaColaboradorId, setNovaTarefaColaboradorId] = useState(null);

  const gestorId = 99;

  const tarefasColaborador = colaboradorSelecionado
    ? tarefas.filter((t) => t.colaboradorId === colaboradorSelecionado)
    : tarefas.filter((t) => t.colaboradorId !== null);

  const tarefasDoGestor = tarefas.filter((t) => t.colaboradorId === null && t.gestorId === gestorId);

  const handleAdicionarTarefa = () => {
    if (!novaTarefaTitulo.trim()) {
      alert("Digite o título da tarefa.");
      return;
    }

    const novaTarefa = {
      id: tarefas.length + 1,
      titulo: novaTarefaTitulo.trim(),
      status: "Pendente",
      colaboradorId: novaTarefaColaboradorId ? Number(novaTarefaColaboradorId) : null,
      gestorId,
    };

    setTarefas([...tarefas, novaTarefa]);
    setNovaTarefaTitulo("");
    setNovaTarefaColaboradorId(null);
  };

  const handleExcluirTarefa = (id) => {
    if (window.confirm("Deseja realmente excluir essa tarefa?")) {
      setTarefas(tarefas.filter((t) => t.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
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
            <li onClick={() => navigate("/dashboard-gestor")}>
              <FaTachometerAlt /> Dashboard
            </li>
            <li onClick={() => navigate("/colaboradores")}>
              <FaUsers /> Colaboradores
            </li>
            <li onClick={() => navigate("/gerenciar-tarefas")} className="active-menu-item">
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

      <main className="main-content gestor-tarefas-main">
        <header className="gestor-tarefas-header">
          <h1>Tarefas</h1>
          <p>Gerencie as tarefas dos colaboradores e suas próprias atividades.</p>
        </header>

        <section className="card filtro-criacao-tarefa">
          <div className="filtro-colaborador">
            <label htmlFor="select-colaborador">Filtrar por colaborador:</label>
            <select
              id="select-colaborador"
              value={colaboradorSelecionado || ""}
              onChange={(e) => setColaboradorSelecionado(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">-- Todos --</option>
              {colaboradoresMock.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="nova-tarefa">
            <h2>Criar nova tarefa</h2>
            <input
              type="text"
              placeholder="Título da tarefa"
              value={novaTarefaTitulo}
              onChange={(e) => setNovaTarefaTitulo(e.target.value)}
              className="input-text"
            />
            <select
              value={novaTarefaColaboradorId || ""}
              onChange={(e) => setNovaTarefaColaboradorId(e.target.value || null)}
              className="input-select"
            >
              <option value="">Atribuir a: Gestor (eu)</option>
              {colaboradoresMock.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
            <button onClick={handleAdicionarTarefa} className="btn-primary">
              <FaPlus style={{ marginRight: "8px" }} /> Adicionar tarefa
            </button>
          </div>
        </section>

        <section className="lista-tarefas">
          <h2>
            Tarefas {colaboradorSelecionado ? `de ${colaboradoresMock.find((c) => c.id === colaboradorSelecionado)?.nome}` : "de todos os colaboradores"}
          </h2>

          {tarefasColaborador.length === 0 ? (
            <p className="no-tasks-msg">Nenhuma tarefa encontrada.</p>
          ) : (
            <ul className="tarefas-list">
              {tarefasColaborador.map((t) => (
                <li key={t.id} className="card tarefa-card">
                  <div className="tarefa-info">
                    <span className="tarefa-titulo">{t.titulo}</span>
                    <span className={`tarefa-status status-${t.status.toLowerCase().replace(" ", "-")}`}>
                      {t.status}
                    </span>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleExcluirTarefa(t.id)}
                    title="Excluir tarefa"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="tarefas-gestor">
          <h2>Minhas tarefas (Gestor)</h2>

          {tarefasDoGestor.length === 0 ? (
            <p className="no-tasks-msg">Você não possui tarefas atribuídas.</p>
          ) : (
            <ul className="tarefas-list">
              {tarefasDoGestor.map((t) => (
                <li key={t.id} className="card tarefa-card">
                  <div className="tarefa-info">
                    <span className="tarefa-titulo">{t.titulo}</span>
                    <span className={`tarefa-status status-${t.status.toLowerCase().replace(" ", "-")}`}>
                      {t.status}
                    </span>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleExcluirTarefa(t.id)}
                    title="Excluir tarefa"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default GestorTarefas;
