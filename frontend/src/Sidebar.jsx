import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as ProductsIcon } from "./icons/box.svg";
import { ReactComponent as AnalyticsIcon } from "./icons/chart.svg";
import { ReactComponent as SupportIcon } from "./icons/support.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";
import { ReactComponent as CollapseIcon } from "./icons/chevron-left.svg";
import { ReactComponent as ExpandIcon } from "./icons/chevron-right.svg";

export default function Sidebar({ isCollapsed, isMobileOpen, toggleCollapse }) {
  return (
    <nav
      className={`sidebar 
        ${isCollapsed ? "collapsed" : ""} 
        ${isMobileOpen ? "mobile-open" : ""}`}
    >
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={toggleCollapse}>
          {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
        </button>
      </div>

      <div className="sidebar-menu">
        <Link to="/" className="sidebar-item">
          <HomeIcon className="sidebar-icon" />
          {!isCollapsed && <span>Главная</span>}
        </Link>
        <Link to="/products" className="sidebar-item">
          <ProductsIcon className="sidebar-icon" />
          {!isCollapsed && <span>Мои продукты</span>}
        </Link>
        <Link to="/analytics" className="sidebar-item">
          <AnalyticsIcon className="sidebar-icon" />
          {!isCollapsed && <span>Аналитика</span>}
        </Link>
        <Link to="/support" className="sidebar-item">
          <SupportIcon className="sidebar-icon" />
          {!isCollapsed && <span>Поддержка</span>}
        </Link>
        <Link to="/about" className="sidebar-item">
          <InfoIcon className="sidebar-icon" />
          {!isCollapsed && <span>О проекте</span>}
        </Link>
      </div>
    </nav>
  );
}
