// frontend/src/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Ошибка загрузки профиля");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        alert(error.message);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="profile-page">
      <h2>Мой профиль</h2>
      {userData && (
        <div className="profile-content">
          <div className="profile-info">
            <p>Email: {userData.email}</p>
            <p>
              Дата регистрации:{" "}
              {new Date(userData.created_at).toLocaleDateString()}
            </p>
            <p>Браузер регистрации: {userData.registration_browser}</p>
          </div>
        </div>
      )}
    </div>
  );
}
