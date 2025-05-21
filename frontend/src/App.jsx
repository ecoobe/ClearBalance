import React from "react";
import "./styles.css";

export default function App() {
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
          <span className="logo-gradient">ClearBalance</span>
        </div>
        <button className="cta-button secondary" onClick={handleLogin}>
          Войти
        </button>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>
            <span className="gradient-text">Умное управление</span>
            <br />
            вашими финансами
          </h1>
          <p className="subtitle">
            Автоматизация учёта расходов, AI-аналитика
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
