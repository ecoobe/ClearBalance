import React from "react";

export default function ProfileIcon({ isActive }) {
  return (
    <div className={`profile-icon-container ${isActive ? "active" : ""}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isActive ? "#FFFFFF" : "#E4E6EB"}
        strokeWidth="1.5"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}
