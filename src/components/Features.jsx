import React from 'react';
import { Map, Zap, Timer, Bell } from 'lucide-react';
import './Features.css';

const Features = () => {
  const featureList = [
    {
      icon: <Map size={24} />,
      title: "Avoid Bottlenecks Instantly",
      desc: "Live heatmaps show exactly where crowds are dense, so you can take the clear path instead."
    },
    {
      icon: <Zap size={24} />,
      title: "Find Your Seat Faster",
      desc: "Our AI calculates the most efficient walking routes customized to your exact location."
    },
    {
      icon: <Timer size={24} />,
      title: "Never Wait for Food Again",
      desc: "Real-time wait times for nearby restrooms and concessions—always pick the shortest line."
    },
    {
      icon: <Bell size={24} />,
      title: "Stay Ahead of the Rush",
      desc: "Get instant alerts about sudden crowd surges or rapidly emptying exits."
    }
  ];

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Value Driven Features</span>
          <h2 className="section-title">Everything You Need to Take Control</h2>
        </div>

        <div className="features-grid">
          {featureList.map((feat, idx) => (
            <div className="feature-card glass-panel" key={idx}>
              <div className="feature-icon-wrapper">
                {feat.icon}
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
