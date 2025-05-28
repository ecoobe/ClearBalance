// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as ProductsIcon } from "./icons/box.svg";
import { ReactComponent as AnalyticsIcon } from "./icons/chart.svg";
import { ReactComponent as SupportIcon } from "./icons/support.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";
import classNames from "classnames";
import "./Sidebar.css";

const menuItems = [
  { path: "/", icon: HomeIcon, label: "Главная" },
  { path: "/products", icon: ProductsIcon, label: "Мои продукты" },
  { path: "/analytics", icon: AnalyticsIcon, label: "Аналитика" },
  { path: "/support", icon: SupportIcon, label: "Поддержка" },
  { path: "/about", icon: InfoIcon, label: "О проекте" },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  return (
    <nav className={classNames("sidebar", { open: isOpen, mobile: isMobile })}>
      <div className="sidebar-menu">
        {menuItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={classNames("sidebar-item", {
              active: location.pathname === path,
            })}
            onClick={onClose}
          >
            <Icon className="sidebar-icon" />
            <span className="sidebar-text">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
