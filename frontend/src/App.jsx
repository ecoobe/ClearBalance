import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles/styles.css";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("token"))
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) setIsSidebarOpen(false);
    };

    checkAuth();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />

      {isLoggedIn && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <main
        className={`app__content ${isLoggedIn ? "app__content--shifted" : ""}`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

const HomePage = () => (
  <div className="hero">
    <h1 className="hero__title">
      <span className="gradient-text">Система управления</span>
      <br />
      финансовыми потоками
    </h1>
    <p className="hero__subtitle">
      Гибкая система учёта задолженностей, депозитов
      <br />и прогнозирование бюджета
    </p>
  </div>
);

// Заглушки для страниц
const ProductsPage = () => <div className="page">Мои продукты</div>;
const AnalyticsPage = () => <div className="page">Аналитика</div>;
const SupportPage = () => <div className="page">Поддержка</div>;
const AboutPage = () => <div className="page">О проекте</div>;

export default App;
