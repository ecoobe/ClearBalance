import React from 'react';
import './App.css'; // Добавим стили

function App() {
  const handleRegister = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: 'user@example.com',
          password: 'securepassword123'
        })
      });
      const data = await response.json();
      alert(data.message || 'Регистрация успешна!');
    } catch (error) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <button 
          className="register-btn"
          onClick={handleRegister}
        >
          Регистрация
        </button>
      </nav>
      
      <div className="hero-section">
        <h1>Добро пожаловать в ClearBalance</h1>
        <p>Управляйте финансами легко и удобно</p>
      </div>
    </div>
  );
}

export default App;