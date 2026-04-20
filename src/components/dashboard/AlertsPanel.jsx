import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const AlertsPanel = ({ zones }) => {
  const crowdedZones = zones.filter(z => z.level === 'High');

  if (crowdedZones.length === 0) {
    return (
      <section className="dashboard-card alerts-panel" style={{ marginBottom: '32px' }}>
        <h2 className="dashboard-card-title">Live Alerts</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
          <CheckCircle2 size={18} style={{ color: '#10b981' }} aria-hidden="true" />
          <p style={{ fontSize: '0.875rem' }}>No active bottlenecks detected. All clear!</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="dashboard-card alerts-panel"
      style={{
        marginBottom: '32px',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.05), rgba(255, 255, 255, 0.02))'
      }}
      aria-labelledby="alerts-title"
    >
      <h2
        id="alerts-title"
        className="dashboard-card-title"
        style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <AlertTriangle size={20} aria-hidden="true" /> Active Alerts
      </h2>
      <div className="alerts-list">
        {crowdedZones.map((zone, idx) => (
          <div
            key={zone.id}
            role="alert"
            style={{
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '6px',
              marginBottom: idx !== crowdedZones.length - 1 ? '12px' : '0',
              borderLeft: '4px solid #ef4444'
            }}
          >
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', display: 'block' }}>
              Avoid <strong>{zone.name}</strong> — high congestion detected. Estimated delay: {zone.waitTime} mins.
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlertsPanel;
