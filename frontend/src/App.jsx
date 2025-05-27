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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsCollapsed(isMobile);
      if (!isMobile) setIsMobileMenuOpen(false);
    };

    checkAuth();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarHover = (isHovered) => {
    if (window.innerWidth > 768 && isCollapsed) {
      setIsCollapsed(!isHovered);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-left">
          {isLoggedIn && (
            <button
              className={`burger-menu ${isMobileMenuOpen ? "open" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Меню"
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
          )}
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-gradient">coobe</span>
            </Link>
          </div>
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

      {isLoggedIn && (
        <Sidebar
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileMenuOpen}
          onHover={handleSidebarHover}
        />
      )}

      <div className={`app-content ${isLoggedIn ? "with-sidebar" : ""}`}>
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
