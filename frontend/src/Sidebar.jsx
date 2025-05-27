import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as ProductsIcon } from "./icons/box.svg";
import { ReactComponent as AnalyticsIcon } from "./icons/chart.svg";
import { ReactComponent as SupportIcon } from "./icons/support.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";

export default function Sidebar({ isOpen, isMobile, onClose }) {
  return (
    <nav
      className={`sidebar ${isOpen ? "open" : ""} ${isMobile ? "mobile" : ""}`}
      onClick={(e) => isMobile && e.target.closest("a") && onClose()}
    >
      <div className="sidebar-menu">
        {[
          {
            path: "/",
            icon: <HomeIcon className="sidebar-icon" />,
            text: "Главная",
          },
          {
            path: "/products",
            icon: <ProductsIcon className="sidebar-icon" />,
            text: "Мои продукты",
          },
          {
            path: "/analytics",
            icon: <AnalyticsIcon className="sidebar-icon" />,
            text: "Аналитика",
          },
          {
            path: "/support",
            icon: <SupportIcon className="sidebar-icon" />,
            text: "Поддержка",
          },
          {
            path: "/about",
            icon: <InfoIcon className="sidebar-icon" />,
            text: "О проекте",
          },
        ].map((item, index) => (
          <Link key={index} to={item.path} className="sidebar-item">
            {item.icon}
            <span className="menu-text">{item.text}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
