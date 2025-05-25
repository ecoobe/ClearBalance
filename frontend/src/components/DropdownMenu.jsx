import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";

export default function DropdownMenu({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileNavigation = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className={`profile-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Профильное меню"
      >
        <ProfileIcon isActive={isOpen} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="user-preview">
            <ProfileIcon />
            <span>user@example.com</span> {/* Временная заглушка */}
          </div>
          <div className="menu-items">
            <button className="dropdown-item" onClick={handleProfileNavigation}>
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
              </svg>
              Профиль
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                setIsOpen(false);
                navigate("/settings");
              }}
            >
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94 0 .31.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
              Настройки
            </button>
            <button
              className="dropdown-item logout"
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
            >
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path d="M14.08 15.59L16.67 13H7v-2h9.67l-2.59-2.59L15.5 7l5 5-5 5-1.42-1.41zM19 3a2 2 0 0 1 2 2v4.67l-2-2V5H5v14h14v-2.67l2-2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14z" />
              </svg>
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
