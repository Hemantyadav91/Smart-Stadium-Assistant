import React from 'react';
import { CheckCircle } from 'lucide-react';
import './Solution.css';

const Solution = () => {
  const benefits = [
    "Crowd insights to see which areas are packed before walking there",
    "Smart suggestions for the shortest lines at food stands and restrooms",
    "Better decision-making so you can enjoy more of the actual event"
  ];

  return (
    <section className="solution-section" id="solution">
      <div className="container">
        <div className="solution-content">
          <div className="solution-text">
            <span className="section-tag">The Solution</span>
            <h2 className="section-title">Your Personal AI Stadium Guide</h2>
            <p className="solution-desc">
              We process real-time crowd data and stadium metrics to give you the upper hand. No more guessing—just smart, seamless navigation.
            </p>
            
            <ul className="benefits-list">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="benefit-item">
                  <div className="benefit-icon">
                    <CheckCircle size={20} />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="solution-visual glass-panel">
            <div className="mock-ui">
              <div className="mock-header">
                <div className="mock-avatar"></div>
                <div className="mock-title">Smart Route Active</div>
              </div>
              <div className="mock-map">
                <div className="route-line"></div>
                <div className="point start"></div>
                <div className="point end"></div>
              </div>
              <div className="mock-card card-1">
                <span className="card-dot green"></span>
                Gate C - 2 min wait
              </div>
              <div className="mock-card card-2">
                <span className="card-dot red"></span>
                Gate A - 15 min wait
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
