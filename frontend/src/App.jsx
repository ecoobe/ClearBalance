import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import DropdownMenu from "./components/DropdownMenu";
import StubPage from "./components/StubPage";
import BellIcon from "./components/BellIcon";

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
        <div className="nav-left-group">
          <Link to="/" className="logo-link">
            <span className="logo-gradient">coobe</span>
          </Link>

          {isLoggedIn && (
            <div className="nav-links">
              <Link to="/dashboard" className="nav-link">
                Дашборд
              </Link>
              <Link to="/transactions" className="nav-link">
                Транзакции
              </Link>
              <Link to="/accounts" className="nav-link">
                Счета
              </Link>
              <Link to="/reports" className="nav-link">
                Отчеты
              </Link>
            </div>
          )}
        </div>

        <div className="nav-right-group">
          {isLoggedIn ? (
            <>
              <Link to="/notifications" className="icon-link">
                <BellIcon />
              </Link>
              <DropdownMenu onLogout={handleLogout} />
            </>
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
        <Route path="/dashboard" element={<StubPage title="Дашборд" />} />
        <Route path="/transactions" element={<StubPage title="Транзакции" />} />
        <Route path="/accounts" element={<StubPage title="Счета" />} />
        <Route path="/reports" element={<StubPage title="Отчеты" />} />
        <Route
          path="/notifications"
          element={<StubPage title="Уведомления" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
