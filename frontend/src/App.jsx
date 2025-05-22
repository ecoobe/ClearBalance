import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setIsDarkTheme(savedTheme === "dark");
    document.documentElement.className = savedTheme || "dark-theme";
  }, []);

  const handleToggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark-theme" : "light-theme");
    document.documentElement.className = newTheme
      ? "dark-theme"
      : "light-theme";
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
        }),
      });
      const data = await response.json();
      alert(data.message || "Регистрация успешна!");
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  };

  const handleLogin = () => {
    alert("Функционал входа в разработке");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-gradient">coobe</span>
        </div>
        <div className="nav-controls">
          <button
            className="theme-toggle"
            onClick={handleToggleTheme}
            aria-label="Переключить тему"
          >
            {isDarkTheme ? "🌞" : "🌙"}
          </button>
          <button className="cta-button secondary" onClick={handleLogin}>
            Войти
          </button>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>
            <span className="gradient-text">Система управления</span>
            <br />
            своими финансами
          </h1>
          <p className="subtitle">
            Гибкая система учёта задолженностей, депозитов
            <br />и прогнозирование бюджета
          </p>

          <div className="cta-container">
            <button className="cta-button" onClick={handleRegister}>
              Попробовать бесплатно
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
