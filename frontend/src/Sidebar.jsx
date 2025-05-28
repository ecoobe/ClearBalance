import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ProductsIcon,
  AnalyticsIcon,
  SupportIcon,
  InfoIcon,
} from "./icons";
import "./sidebar.css";

const menuItems = [
  { path: "/", icon: HomeIcon, text: "Главная", end: true },
  { path: "/products", icon: ProductsIcon, text: "Мои продукты" },
  { path: "/analytics", icon: AnalyticsIcon, text: "Аналитика" },
  { path: "/support", icon: SupportIcon, text: "Поддержка" },
  { path: "/about", icon: InfoIcon, text: "О проекте" },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <nav className="sidebar__nav">
        {menuItems.map(({ path, icon: Icon, text, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
            }
            onClick={onClose}
          >
            <Icon className="sidebar__icon" />
            <span className="sidebar__text">{text}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
