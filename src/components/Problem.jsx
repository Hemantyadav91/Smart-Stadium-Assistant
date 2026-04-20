import React from 'react';
import { Clock, Users, NavigationOff } from 'lucide-react';
import './Problem.css';

const Problem = () => {
  const problems = [
    {
      icon: <Clock size={32} />,
      title: "Missed the Big Play?",
      desc: "There's nothing worse than hearing the crowd erupt while you're stuck in an endless concession line."
    },
    {
      icon: <Users size={32} />,
      title: "Trapped in the Concourse",
      desc: "Getting crushed in halftime bottlenecks turns a fun outing into an exhausting ordeal."
    },
    {
      icon: <NavigationOff size={32} />,
      title: "Lost on the Way Back",
      desc: "Wandering massive, confusing arenas just trying to find your section or the nearest exit."
    }
  ];

  return (
    <section className="problem-section" id="problem">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">The Challenge</span>
          <h2 className="section-title">You Paid for the Game, Not the Lines</h2>
          <p className="section-desc">
            Navigating a massive stadium shouldn't be stressful. Stop letting crowds control your event experience.
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((prob, idx) => (
            <div className="problem-card glass-panel" key={idx}>
              <div className="problem-icon">
                {prob.icon}
              </div>
              <h3 className="problem-card-title">{prob.title}</h3>
              <p className="problem-card-desc">{prob.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
