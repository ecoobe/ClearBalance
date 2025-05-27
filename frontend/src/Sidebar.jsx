import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as ProductsIcon } from "./icons/box.svg";
import { ReactComponent as AnalyticsIcon } from "./icons/chart.svg";
import { ReactComponent as SupportIcon } from "./icons/support.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";

export default function Sidebar({ isOpen, isMobile, onClose }) {
  return (
    <aside
      className={`sidebar ${isOpen ? "open" : ""} ${isMobile ? "mobile" : ""}`}
      onClick={(e) => {
        if (isMobile && e.target.closest("a")) onClose();
      }}
    >
      <nav className="sidebar-nav">
        {[
          { path: "/", icon: <HomeIcon />, text: "Главная" },
          { path: "/products", icon: <ProductsIcon />, text: "Мои продукты" },
          { path: "/analytics", icon: <AnalyticsIcon />, text: "Аналитика" },
          { path: "/support", icon: <SupportIcon />, text: "Поддержка" },
          { path: "/about", icon: <InfoIcon />, text: "О проекте" },
        ].map((item, index) => (
          <Link key={index} to={item.path} className="nav-item">
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.text}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
