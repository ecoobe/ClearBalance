import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        setIsLoading(true);
        const response = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error(data.detail || "Ошибка загрузки профиля");
        }

        setUserData({
          ...data,
          created_at: data.created_at ? new Date(data.created_at) : null,
        });
        setError("");
      } catch (error) {
        setError(error.message || "Произошла непредвиденная ошибка");
        if (error.name !== "AbortError") {
          console.error("Profile fetch error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) return "Нет данных";
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Мой профиль</h2>

      {isLoading ? (
        <div className="profile-loading">
          <div className="spinner"></div>
          <p>Загрузка данных профиля...</p>
        </div>
      ) : error ? (
        <div className="profile-error">
          <p>❌ {error}</p>
          <button
            className="cta-button secondary"
            onClick={() => window.location.reload()}
          >
            Повторить попытку
          </button>
        </div>
      ) : userData ? (
        <div className="profile-content">
          <div className="profile-info-card">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Дата регистрации:</span>
              <span className="info-value">
                {formatDate(userData.created_at)}
              </span>
            </div>

            {userData.registration_browser && (
              <div className="info-item">
                <span className="info-label">Браузер регистрации:</span>
                <span className="info-value">
                  {userData.registration_browser}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
