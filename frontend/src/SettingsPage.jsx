import React from "react";

export default function SettingsPage() {
  return (
    <div className="settings-page">
      <h2>Настройки аккаунта</h2>
      <div className="settings-content">
        <div className="settings-section">
          <h3>Безопасность</h3>
          <button className="cta-button secondary">Сменить пароль</button>
        </div>
      </div>
    </div>
  );
}
