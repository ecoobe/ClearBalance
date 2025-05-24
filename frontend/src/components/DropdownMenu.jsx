// frontend/src/components/DropdownMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="profile-button" onClick={() => setIsOpen(!isOpen)}>
        <ProfileIcon />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <Link
            to="/profile"
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            Профиль
          </Link>
          <Link
            to="/settings"
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            Настройки
          </Link>
          <button className="dropdown-item logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}
