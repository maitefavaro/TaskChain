import React from "react";
import Logo from "../components/Logo";
import "../assets/Dashboard.css";
import { FaTachometerAlt, FaUser, FaProjectDiagram, FaTasks, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();

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
            <li onClick={() => navigate("/dashboard")}><FaTachometerAlt /> Dashboard</li>
            <li onClick={() => navigate("/projects")}><FaProjectDiagram /> Tasks</li>
          </ul>
        </nav>
        <div className="settings">
          <FaCog /> Settings
        </div>
        <div className="logout" onClick={handleLogout}>
          <span style={{ cursor: 'pointer', color: 'red' }}>Sair</span>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
