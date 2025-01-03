import React from 'react';
import './HeroSection.css';

const HeroSection = ({ scrollToSearch }) => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Stock Analyzer</h1>
        <p className="hero-subtitle">
          Make smarter, data-driven investment decisions with real-time insights and trends.
        </p>
        <button className="hero-button" onClick={scrollToSearch}>
          Explore Stocks
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
