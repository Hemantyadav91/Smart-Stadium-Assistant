import React, { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ setView, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main Navigation">
      <div className="container navbar-container">
        <a 
          href="/" 
          className="nav-logo" 
          onClick={(e) => { e.preventDefault(); setView('landing'); }}
          aria-label="Smart Stadium Home"
        >
          <Activity size={24} className="logo-icon" aria-hidden="true" />
          <span>Smart Stadium</span>
        </a>

        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <button 
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
          
          <div className="nav-navigation-links" role="menubar">
            {currentView === 'landing' && (
              <>
                <a href="#problem" onClick={() => setIsMobileMenuOpen(false)} role="menuitem">The Challenge</a>
                <a href="#solution" onClick={() => setIsMobileMenuOpen(false)} role="menuitem">Solution</a>
                <a href="#features" onClick={() => setIsMobileMenuOpen(false)} role="menuitem">Features</a>
                <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} role="menuitem">How It Works</a>
              </>
            )}
          </div>

          <button 
            className="btn btn-primary nav-mobile-btn"
            onClick={() => { setView(currentView === 'landing' ? 'dashboard' : 'landing'); setIsMobileMenuOpen(false); }}
            aria-label={currentView === 'landing' ? "Go to live dashboard" : "Return to home page"}
          >
            {currentView === 'landing' ? 'Dashboard' : 'Back to Home'}
          </button>
        </div>

        <div className="nav-actions">
          <button 
            className="btn btn-primary nav-btn"
            onClick={() => setView(currentView === 'landing' ? 'dashboard' : 'landing')}
            aria-label={currentView === 'landing' ? "Enter live stadium dashboard" : "Return to landing page"}
          >
            {currentView === 'landing' ? 'Enter Dashboard' : 'Back to Home'}
          </button>
          
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
