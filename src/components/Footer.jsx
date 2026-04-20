import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="brand-logo" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Smart Stadium Assistant</h2>
            <p className="brand-desc">
              Navigating massively crowded venues, simplified by real-time AI insights. Dedicated to enhancing the fan experience through technology.
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer Navigation">
            <a href="#problem">The Challenge</a>
            <a href="#solution">Solution</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Smart Stadium Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
