import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as ProductsIcon } from "./icons/box.svg";
import { ReactComponent as AnalyticsIcon } from "./icons/chart.svg";
import { ReactComponent as SupportIcon } from "./icons/support.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";

export default function Sidebar({
  isMobileOpen,
  isCollapsed,
  onClose,
  onHover,
}) {
  return (
    <nav
      className={`sidebar ${isMobileOpen ? "open" : ""} ${
        isCollapsed ? "collapsed" : ""
      }`}
      onMouseEnter={() => onHover(false)}
      onMouseLeave={() => onHover(true)}
    >
      <div className="sidebar-menu">
        <Link to="/" className="sidebar-item" onClick={onClose}>
          <HomeIcon className="sidebar-icon" />
          <span className="sidebar-text">Главная</span>
        </Link>
        <Link to="/products" className="sidebar-item" onClick={onClose}>
          <ProductsIcon className="sidebar-icon" />
          <span className="sidebar-text">Мои продукты</span>
        </Link>
        <Link to="/analytics" className="sidebar-item" onClick={onClose}>
          <AnalyticsIcon className="sidebar-icon" />
          <span className="sidebar-text">Аналитика</span>
        </Link>
        <Link to="/support" className="sidebar-item" onClick={onClose}>
          <SupportIcon className="sidebar-icon" />
          <span className="sidebar-text">Поддержка</span>
        </Link>
        <Link to="/about" className="sidebar-item" onClick={onClose}>
          <InfoIcon className="sidebar-icon" />
          <span className="sidebar-text">О проекте</span>
        </Link>
      </div>
    </nav>
  );
}
