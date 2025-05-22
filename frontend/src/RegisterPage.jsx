import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/start-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Ошибка отправки кода");
      }

      setStep(2);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/confirm-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          password,
          password_confirm: confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Ошибка регистрации");
      }

      alert("Регистрация успешно завершена!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Регистрация ({step}/2)</h2>

      {step === 1 ? (
        <form onSubmit={handleStartRegistration}>
          <input
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <div className="button-group">
            <button type="submit" className="cta-button" disabled={isLoading}>
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                "Отправить код подтверждения"
              )}
            </button>
            <button
              type="button"
              className="cta-button secondary"
              onClick={() => navigate("/login")}
              disabled={isLoading}
            >
              Уже есть аккаунт? Войти
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleConfirmRegistration}>
          <p className="info-text">
            На адрес {email} отправлен код подтверждения
          </p>
          <input
            type="text"
            placeholder="Введите код из письма"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Придумайте пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <div className="button-group">
            <button type="submit" className="cta-button" disabled={isLoading}>
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                "Завершить регистрацию"
              )}
            </button>
            <button
              type="button"
              className="cta-button secondary"
              onClick={() => setStep(1)}
              disabled={isLoading}
            >
              Назад
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
