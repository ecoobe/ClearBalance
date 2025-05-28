import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles/styles.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import DropdownMenu from "./components/DropdownMenu";
import Sidebar from "./Sidebar";
import NotificationIcon from "./NotificationIcon";

const HeroPage = () => (
  <main className="hero">
    <div className="hero-content">
      <h1>
        <span className="gradient-text">Система управления</span>
        <br />
        финансовыми потоками
      </h1>
      <p className="subtitle">
        Гибкая система учёта задолженностей, депозитов
        <br />и прогнозирование бюджета
      </p>
    </div>
  </main>
);

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="app">
      {isLoggedIn && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <svg viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      )}

      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-gradient">coobe</span>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="nav-group">
            <NotificationIcon count={3} />
            <DropdownMenu onLogout={handleLogout} />
          </div>
        ) : (
          <button
            className="cta-button secondary"
            onClick={() => navigate("/login")}
          >
            Войти
          </button>
        )}
      </nav>

      {isLoggedIn && <Sidebar isOpen={isSidebarOpen} />}
      <div
        className={`app-content ${isLoggedIn ? "with-sidebar" : ""}`}
        style={{
          marginLeft: isLoggedIn ? (isSidebarOpen ? "240px" : "72px") : 0,
        }}
      >
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/products"
            element={<div className="page">Мои продукты</div>}
          />
          <Route
            path="/analytics"
            element={<div className="page">Аналитика</div>}
          />
          <Route
            path="/support"
            element={<div className="page">Поддержка</div>}
          />
          <Route
            path="/about"
            element={<div className="page">О проекте</div>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
