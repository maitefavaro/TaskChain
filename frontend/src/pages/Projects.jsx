import React, { useState, useEffect } from "react";
import "../assets/Projects.css";
import axios from "axios";
import {
  FaCalendarAlt, FaFlag, FaQuestionCircle, FaCheckCircle,
  FaTachometerAlt, FaProjectDiagram, FaCog
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const initialTasks = [
  { id: "1", title: "Criar protótipo", status: "To Do", needHelp: false },
  { id: "2", title: "Revisar requisitos", status: "Doing", needHelp: true },
  { id: "3", title: "Publicar release", status: "Done", needHelp: false },
];

const statusColumns = ["To Do", "Doing", "Done"];

const TaskCard = ({ task, onToggleHelp }) => (
  <div className={`task-card ${task.needHelp ? "highlight-help" : ""}`}>
    <div className="card-header">
      <span className="task-title">
        {task.title}
        {task.status === "Done" && <FaCheckCircle className="done-icon" title="Tarefa concluída" />}
      </span>
    </div>
    <div className="card-icons">
      <FaCalendarAlt title="Data prevista" className="icon" />
      <FaFlag title="Prioridade" className="icon" />
      <FaQuestionCircle
        title="Ajuda necessária"
        className={`icon ${task.needHelp ? "help-needed" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleHelp(task.id);
        }}
      />
    </div>
  </div>
);

const Projects = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", status: "To Do", needHelp: false });
  const [showHelpMessage, setShowHelpMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/pessoas/")
      .then((res) => {
        console.log("Pessoas vindas do backend:", res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar pessoas:", err);
      });
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

    const updatedTasks = tasks.map((t) =>
      t.id === draggableId ? { ...t, status: destination.droppableId } : t
    );
    setTasks(updatedTasks);
  };

  const openModal = (task) => setSelectedTask(task);
  const closeModal = () => setSelectedTask(null);

  const handleNewTaskChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTask = () => {
    const task = { ...newTask, id: uuidv4() };
    setTasks((prev) => [...prev, task]);
    setNewTask({ title: "", status: "To Do", needHelp: false });
    setShowNewTaskModal(false);
  };

  const toggleHelp = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, needHelp: !task.needHelp } : task
      )
    );
    setSelectedTask((prev) =>
      prev && prev.id === taskId ? { ...prev, needHelp: !prev.needHelp } : prev
    );
    setShowHelpMessage(true);
    setTimeout(() => setShowHelpMessage(false), 3000);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-container">
          <h2>TaskChain</h2>
        </div>
        <nav className="menu">
          <ul>
            <li onClick={() => navigate("/dashboard")}><FaTachometerAlt /> Dashboard</li>
            <li className="active"><FaProjectDiagram /> Tasks</li>
          </ul>
        </nav>
        <div className="settings">
          <FaCog /> Settings
        </div>
      </aside>

      <main className="main-content">
        <div className="kanban-header">
          <h1>Minhas Tasks</h1>
          <button className="new-task-btn" onClick={() => setShowNewTaskModal(true)}>
            Nova Tarefa
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-board">
            {statusColumns.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    className="kanban-column"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>{status}</h2>
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable draggableId={task.id} index={index} key={task.id}>
                          {(provided) => (
                            <div
                              className="draggable-wrapper"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => openModal(task)}
                            >
                              <TaskCard task={task} onToggleHelp={toggleHelp} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {selectedTask && (
          <div className="modal-overlay" onClick={closeModal}>
            {showHelpMessage && (
              <div className="help-toast">
                A equipe foi notificada! 💬
              </div>
            )}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedTask.title}</h2>
              <p>Status: {selectedTask.status}</p>
              <p>Ajuda necessária: {selectedTask.needHelp ? "Sim" : "Não"}</p>
              <button
                onClick={() => toggleHelp(selectedTask.id)}
                className="new-task-btn"
                style={{ marginBottom: "1rem" }}
              >
                {selectedTask.needHelp ? "Remover ajuda" : "Preciso de ajuda"}
              </button>
              <button className="close-btn" onClick={closeModal}>Fechar</button>
            </div>
          </div>
        )}

        {showNewTaskModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Nova Tarefa</h2>
              <input
                type="text"
                name="title"
                placeholder="Título da tarefa"
                value={newTask.title}
                onChange={handleNewTaskChange}
              />
              <select name="status" value={newTask.status} onChange={handleNewTaskChange}>
                <option value="To Do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>

              <button
                type="button"
                className={`help-toggle-button ${newTask.needHelp ? "active" : ""}`}
                onClick={() =>
                  setNewTask((prev) => ({ ...prev, needHelp: !prev.needHelp }))
                }
              >
                {newTask.needHelp ? "Requisitando ajuda ✓" : "Preciso de ajuda"}
              </button>

              <div className="modal-buttons">
                <button onClick={handleAddTask}>Adicionar</button>
                <button className="close-btn" onClick={() => setShowNewTaskModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
