import React from 'react';
import { ArrowRight, Activity, Map } from 'lucide-react';
import './Hero.css';

const Hero = ({ setView }) => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="glow-sphere shape-1"></div>
        <div className="glow-sphere shape-2"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Activity size={16} className="badge-icon" />
            <span>Live Stadium Updates</span>
          </div>
          
          <h1 className="hero-title">
            Beat the Crowd. <span className="text-gradient">Never Miss a Play.</span>
          </h1>
          
          <p className="hero-subtitle">
            Stop wasting time in endless lines. Get live wait times, optimal routes, and crowd insights straight to your phone, so you can focus on the event.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary hero-btn" onClick={() => setView('dashboard')}>
              Skip the Wait <ArrowRight size={20} />
            </button>
            <button className="btn btn-outline hero-btn">
              Explore Live Map <Map size={20} />
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item glass-panel">
              <span className="stat-value">Zero</span>
              <span className="stat-label">Missed Key Moments</span>
            </div>
            <div className="stat-item glass-panel">
              <span className="stat-value">Shortest</span>
              <span className="stat-label">Lines Guaranteed</span>
            </div>
            <div className="stat-item glass-panel">
              <span className="stat-value">Stress-Free</span>
              <span className="stat-label">Stadium Navigation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
