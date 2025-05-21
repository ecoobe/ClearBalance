import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import './styles/variables.css';
import './styles/animations.css';
import './styles/global.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <Features />
    </div>
  );
}