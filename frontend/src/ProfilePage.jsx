// frontend/src/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          }
          return;
        }

        const data = await response.json();
        console.log("Данные профиля:", data);

        // Проверка наличия created_at
        if (!data.created_at) {
          console.error("Ошибка: поле created_at отсутствует в ответе API");
          return;
        }

        setUserData({
          email: data.email,
          created_at: data.created_at,
        });
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "Дата не указана";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Неверный формат даты");
      }

      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Ошибка форматирования даты:", error);
      return "Некорректная дата";
    }
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Мой профиль</h2>

      {userData ? (
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
          </div>
        </div>
      ) : (
        <p>Загрузка данных профиля...</p>
      )}
    </div>
  );
}
