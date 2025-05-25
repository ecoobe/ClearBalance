import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import DropdownMenu from "./components/DropdownMenu";
import StubPage from "./components/StubPage";

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
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-gradient">coobe</span>
          </Link>
        </div>

        <div className="nav-group">
          {isLoggedIn && (
            <>
              <Link to="/products" className="nav-link">
                Мои продукты
              </Link>
              <Link to="/analytics" className="nav-link">
                Аналитика
              </Link>
              <Link to="/about" className="nav-link">
                О приложении
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <DropdownMenu onLogout={handleLogout} />
          ) : (
            <button
              className="cta-button secondary"
              onClick={() => navigate("/login")}
            >
              Войти
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products" element={<StubPage title="Мои продукты" />} />
        <Route path="/analytics" element={<StubPage title="Аналитика" />} />
        <Route path="/about" element={<StubPage title="О приложении" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
