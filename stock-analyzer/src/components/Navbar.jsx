import React from 'react';
import './Navbar.css'; // Import CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Stock Analyzer</h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Features</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
