import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

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
      setResendCooldown(60);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/confirm-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Ошибка подтверждения кода");
      }

      const data = await response.json();
      setTempToken(data.temp_token);
      setStep(3);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temp_token: tempToken,
          password,
          password_confirm: confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Ошибка установки пароля");
      }

      alert("Регистрация успешно завершена!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await handleStartRegistration(new Event("submit"));
      setResendCooldown(60);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Регистрация ({step}/3)</h2>

      {step === 1 && (
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
      )}

      {step === 2 && (
        <form onSubmit={handleConfirmCode}>
          <p className="info-text">
            На адрес {email} отправлен код подтверждения. Проверьте спам.
          </p>
          <input
            type="text"
            placeholder="Введите код из письма"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={isLoading}
          />
          <div className="button-group">
            <button type="submit" className="cta-button" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : "Подтвердить код"}
            </button>
            <button
              type="button"
              className="cta-button secondary"
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || isLoading}
            >
              {resendCooldown > 0
                ? `Отправить повторно (${resendCooldown})`
                : "Отправить код повторно"}
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

      {step === 3 && (
        <form onSubmit={handleSetPassword}>
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
              onClick={() => setStep(2)}
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
