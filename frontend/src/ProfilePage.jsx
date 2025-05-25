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
        setUserData({
          ...data,
          created_at: data.created_at ? new Date(data.created_at) : null,
        });
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) return "";
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

      {userData && (
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
      )}
    </div>
  );
}
