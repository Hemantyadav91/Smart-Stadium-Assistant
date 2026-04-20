import React from 'react';
import { ArrowRight } from 'lucide-react';
import './CTASection.css';

const CTASection = ({ setView }) => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-container glass-panel">
          <div className="cta-glow"></div>
          <h2 className="cta-title">Ready to Upgrade Your Stadium Experience?</h2>
          <p className="cta-desc">
            Stop waiting in lines. Start enjoying the event. Join thousands of fans already navigating smarter today.
          </p>
          <button 
            className="btn btn-primary cta-btn"
            onClick={() => setView('dashboard')}
          >
            Try the Dashboard Now <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
