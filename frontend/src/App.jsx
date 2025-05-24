import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import DropdownMenu from "./components/DropdownMenu";

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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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
      </nav>

      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
