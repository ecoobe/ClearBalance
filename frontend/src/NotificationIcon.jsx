import React from "react";

export default function NotificationIcon({ count = 0 }) {
  return (
    <button className="notification-icon icon-button">
      <svg className="icon" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      {count > 0 && <span className="notification-badge">{count}</span>}
    </button>
  );
}
