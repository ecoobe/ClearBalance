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
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("token"))
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error();
      } catch {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    };

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false);
    };

    checkAuth();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-left">
          {isLoggedIn && (
            <button
              className={`burger-btn ${isSidebarOpen ? "active" : ""}`}
              onClick={toggleSidebar}
              aria-label="Меню"
            >
              <div className="burger-lines">
                <span className="line top"></span>
                <span className="line mid"></span>
                <span className="line btm"></span>
              </div>
            </button>
          )}
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-gradient">coobe</span>
            </Link>
          </div>
        </div>

        {isLoggedIn ? (
          <div className="nav-right">
            <NotificationIcon count={3} />
            <DropdownMenu
              onLogout={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                navigate("/");
              }}
            />
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

      {isLoggedIn && (
        <Sidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onClose={closeSidebar}
        />
      )}

      <main className={`main-content ${isLoggedIn ? "with-sidebar" : ""}`}>
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
      </main>
    </div>
  );
}
