import React from 'react';
import './styles.css';

export default function App() {
  const handleRegister = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'SecurePass123!'
        })
      });
      const data = await response.json();
      alert(data.message || 'Регистрация успешна!');
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-gradient">ClearBalance</span>
        </div>
        <button 
          className="register-btn"
          onClick={handleRegister}
          aria-label="Зарегистрироваться"
        >
          <span>Регистрация</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>
            <span className="gradient-text">Умное управление</span><br/>
            вашими финансами
          </h1>
          <p className="subtitle">
            Автоматизация учёта расходов, AI-аналитика<br/> 
            и прогнозирование бюджета
          </p>
          
          <div className="cta-container">
            <button className="cta-button" onClick={handleRegister}>
              Попробовать бесплатно
            </button>
            <div className="partners">
              <span>Доверяют:</span>
              <div className="partner-logos">
                {/* Добавьте SVG логотипов */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}