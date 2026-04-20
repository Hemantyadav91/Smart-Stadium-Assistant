import React, { useState, useEffect, useRef } from 'react';
import CrowdOverview from './CrowdOverview';
import SmartSuggestions from './SmartSuggestions';
import AlertsPanel from './AlertsPanel';
import './Dashboard.css';

const Dashboard = () => {
  const initialZones = [
    { id: 1, name: 'Gate A', type: 'Exit', level: 'High', waitTime: 30 },
    { id: 2, name: 'Gate B', type: 'Exit', level: 'Low', waitTime: 5 },
    { id: 3, name: 'Main Food Court', type: 'Food', level: 'High', waitTime: 30 },
    { id: 4, name: 'Snack Deck South', type: 'Food', level: 'Medium', waitTime: 15 },
    { id: 5, name: 'Restroom Block 1', type: 'Washroom', level: 'Medium', waitTime: 15 },
    { id: 6, name: 'Restroom Block 2', type: 'Washroom', level: 'Low', waitTime: 5 },
  ];

  const [zones, setZones] = useState(initialZones);
  const [highlightedZoneId, setHighlightedZoneId] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  
  const simulationConfig = useRef({
    levels: ['Low', 'Medium', 'High'],
    waitTimes: { Low: 5, Medium: 15, High: 30 }
  });

  useEffect(() => {
    const { levels, waitTimes } = simulationConfig.current;
    let timeoutId;

    const simulateUpdate = () => {
      // Stochastic logic: only update a random subset of zones (60% chance per zone)
      setZones(prevZones => prevZones.map(zone => {
        if (Math.random() > 0.4) {
          const randomLevel = levels[Math.floor(Math.random() * levels.length)];
          return {
            ...zone,
            level: randomLevel,
            waitTime: waitTimes[randomLevel]
          };
        }
        return zone;
      }));
      
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      // Schedule next update with dynamic interval (5-8 seconds)
      const nextDelay = Math.floor(Math.random() * 3000) + 5000;
      timeoutId = setTimeout(simulateUpdate, nextDelay);
    };

    // Start the first update cycle
    timeoutId = setTimeout(simulateUpdate, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="dashboard-section" id="dashboard" role="main">
      <div className="container">
        <header className="dashboard-header" role="banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="dashboard-title">Live Stadium Dashboard</h1>
              <p className="dashboard-subtitle">Real-time crowd intelligence and AI routing.</p>
            </div>
            <div 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--text-muted)', 
                fontSize: '0.875rem', 
                marginBottom: '8px', 
                background: 'rgba(255,255,255,0.03)', 
                padding: '6px 16px', 
                borderRadius: '50px', 
                border: '1px solid var(--border-color)',
                fontWeight: '500'
              }}
              aria-live="polite"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3b82f6', fontSize: '0.75rem', fontWeight: 'bold' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 8px #3b82f6' }}></span>
                LIVE
              </div>
              <span style={{ opacity: 0.2 }}>|</span>
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="dashboard-main">
            <CrowdOverview zones={zones} highlightedZoneId={highlightedZoneId} />
          </div>
          <div className="dashboard-sidebar">
            <AlertsPanel zones={zones} />
            <SmartSuggestions zones={zones} onHighlight={setHighlightedZoneId} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
