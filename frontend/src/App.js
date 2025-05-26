import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DashboardFuncionario from './pages/DashboardFuncionario';
import Projects from './pages/Projects';
import RoleSelection from "./pages/RoleSelection";
import DashboardGestor from './pages/DashboardGestor';
import Colaboradores from './pages/Colaboradores';
import GestorTarefas from './pages/GestorTarefas';
import RelatoriosGestor from './pages/RelatoriosGestor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-funcionario" element={<DashboardFuncionario />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/dashboard-gestor" element={<DashboardGestor />} />
        <Route path="/colaboradores" element={<Colaboradores />} />
        <Route path="/gerenciar-tarefas" element={<GestorTarefas />} />
        <Route path="/relatorios" element={<RelatoriosGestor />} />
      </Routes>
    </Router>
  );
}

export default App;
