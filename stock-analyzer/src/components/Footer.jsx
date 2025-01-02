import React from 'react';
import './Footer.css'; // Import CSS

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Stock Analyzer. All rights reserved.</p>
      <p>Powered by React</p>
    </footer>
  );
};

export default Footer;
