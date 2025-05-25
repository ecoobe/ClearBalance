import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";

export default function DropdownMenu({ onLogout }) {
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

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className={`profile-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
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
          <button className="dropdown-item logout" onClick={onLogout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}
