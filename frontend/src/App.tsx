import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Form from './pages/Form';
import AdminDashboard from './pages/AdminDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import UserDashboard from './pages/UserDashboard';
import RoleSelect from './pages/RoleSelect';
import './index.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-container">
      {/* Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar - conditionally rendered */}
      {sidebarOpen && (
        <div className="sidebar">
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div className="main-content">
        <div className="header">
          <Header />
        </div>
        <main className="page-content">
          <Routes>
            <Route path="/" element={<RoleSelect />} />
            <Route path="/form" element={<Form />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/verifier" element={<VerifierDashboard />} />
            <Route path="/dashboard/user" element={<UserDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
