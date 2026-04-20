import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Choose Your Need",
      desc: "Open the app and select what you're looking for: your seat section, food, restrooms, or exits."
    },
    {
      num: "02",
      title: "System Analyzes",
      desc: "Our AI processes live camera feeds and ticket scan data to generate a real-time heatmap of stadium activity."
    },
    {
      num: "03",
      title: "Get The Best Route",
      desc: "Follow the dynamic AR or 2D map guiding you through the fastest, least congested path available."
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title">How It Works</h2>
        </div>

        <div className="timeline">
          {steps.map((step, idx) => (
            <div className="timeline-step glass-panel" key={idx}>
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
