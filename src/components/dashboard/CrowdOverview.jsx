import React from 'react';
import { getConfidenceInfo } from '../../utils/dashboardLogic';
import './CrowdOverview.css';

const CrowdOverview = ({ zones, highlightedZoneId }) => {
  if (!zones || zones.length === 0) {
    return (
      <section className="dashboard-card" aria-label="Crowd Overview">
        <h2 className="dashboard-card-title">Live Crowd Overview</h2>
        <p style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>
          Loading stadium data...
        </p>
      </section>
    );
  }

  return (
    <section className="dashboard-card" aria-label="Crowd Overview">
      <h2 className="dashboard-card-title">Live Crowd Overview</h2>
      <div className="zone-grid" aria-live="polite">
        {zones.map(zone => {
          const isHighlighted = zone.id === highlightedZoneId;
          const statusInfo = getConfidenceInfo(zone.level);
          
          return (
            <div 
              key={zone.id} 
              className={`zone-card ${isHighlighted ? 'highlighted' : ''}`}
              role="article"
            >
              <div className="zone-header">
                <h3 className="zone-name">{zone.name}</h3>
                <span className="zone-type">{zone.type}</span>
              </div>
              
              <div className="zone-metrics">
                <div className="metric-box">
                  <span className="metric-label">Status</span>
                  <span 
                    className="metric-value status-badge" 
                    style={{ 
                      backgroundColor: `${statusInfo.color}15`, 
                      color: statusInfo.color, 
                      borderColor: `${statusInfo.color}35` 
                    }}
                  >
                    {zone.level}
                  </span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Est. Wait Time</span>
                  <span className="metric-value time-value">{zone.waitTime} min</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CrowdOverview;
