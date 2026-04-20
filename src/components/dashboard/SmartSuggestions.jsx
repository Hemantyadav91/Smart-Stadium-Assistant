import React, { useState } from 'react';
import { 
  getBestSuggestion, 
  getSuggestionMessage, 
  getBestTimeToMove, 
  getConfidenceInfo 
} from '../../utils/dashboardLogic';

const SmartSuggestions = ({ zones, onHighlight }) => {
  const [intent, setIntent] = useState('Food');
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isOutdated, setIsOutdated] = useState(false);

  // Detect when crowd data (zones) updates after a suggestion has been generated
  React.useEffect(() => {
    if (suggestion && !isLoading) {
      setIsOutdated(true);
    }
  }, [zones]);

  const generateSuggestion = () => {
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate real-time processing delay
    const delay = Math.floor(Math.random() * 300) + 500;
    
    setTimeout(() => {
      const best = getBestSuggestion(zones, intent);
      
      if (!best) {
        setSuggestion(null);
        if (onHighlight) onHighlight(null);
      } else {
        const finalMsg = getSuggestionMessage(best, intent);
        
        setSuggestion({ 
          ...best, 
          generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          message: finalMsg
        });
        setIsOutdated(false);
        
        if (onHighlight) onHighlight(best.id);
      }
      setIsLoading(false);
    }, delay);
  };

  const handleReset = () => {
    setSuggestion(null);
    setHasSearched(false);
    setIsOutdated(false);
    if (onHighlight) onHighlight(null);
  };

  return (
    <section className="dashboard-card" style={{ marginBottom: '32px' }} aria-labelledby="assistant-title">
      <h2 id="assistant-title" className="dashboard-card-title">Smart Assistant</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
        Tell us what you're looking for, and we'll analyze real-time data to find the best route.
      </p>
      
      <div className="suggestion-form">
        <div style={{ marginBottom: '16px' }}>
          <label 
            htmlFor="intent-select" 
            style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: 'var(--text-secondary)' }}
          >
            Select Destination
          </label>
          <select 
            id="intent-select"
            className="dashboard-select" 
            value={intent} 
            onChange={(e) => setIntent(e.target.value)}
            disabled={isLoading}
            aria-label="Target destination category"
          >
            <option value="Food">Food / Concessions</option>
            <option value="Washroom">Washroom</option>
            <option value="Exit">Exit</option>
          </select>
        </div>
        
        <button 
          onClick={generateSuggestion} 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '12px', opacity: isLoading ? 0.7 : 1 }}
          disabled={isLoading}
          aria-label={isLoading ? "Analyzing stadium data" : "Get smart recommendation"}
        >
          {isLoading ? "Analyzing..." : "Get Smart Recommendation"}
        </button>
      </div>

      <div aria-live="polite" style={{ minHeight: '80px' }}>
        {isLoading ? (
          <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.9rem' }}>Scanning stadium zones...</p>
          </div>
        ) : suggestion ? (
          <div style={{ 
            marginTop: '24px', 
            padding: '20px', 
            borderRadius: '12px', 
            background: 'rgba(59, 130, 246, 0.08)', 
            border: '1px solid rgba(59, 130, 246, 0.2)', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            borderLeft: `4px solid ${getConfidenceInfo(suggestion.level).color}`
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
            }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 'bold' }}>AI Recommendation</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.8 }}>
                Snapshot at {suggestion.generatedAt}
              </span>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem', marginBottom: '16px' }}>
              {suggestion.message}
            </p>

            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              fontSize: '0.75rem', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              color: getConfidenceInfo(suggestion.level).color,
              background: `${getConfidenceInfo(suggestion.level).color}10`,
              padding: '4px 10px',
              borderRadius: '4px',
              gap: '6px',
              marginBottom: '20px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: getConfidenceInfo(suggestion.level).color }} aria-hidden="true"></span>
              {getConfidenceInfo(suggestion.level).label}
            </div>

            <div style={{ 
              marginTop: '4px', 
              paddingTop: '12px', 
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ color: 'var(--accent-blue)', opacity: 0.8 }} aria-hidden="true">⚡</span>
              {getBestTimeToMove(suggestion.level)}
            </div>

            {isOutdated && (
              <div style={{ 
                marginTop: '16px', 
                padding: '10px 14px', 
                borderRadius: '8px', 
                background: 'rgba(245, 158, 11, 0.1)', 
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#f59e0b',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                animation: 'pulse 2s infinite'
              }}>
                <span role="img" aria-label="warning">⚠️</span>
                <span>Conditions may have changed. Please refresh recommendation.</span>
              </div>
            )}

            {/* Reset / Clear Button */}
            <button 
              onClick={handleReset} 
              className="btn" 
              style={{ 
                width: '100%', 
                marginTop: '16px', 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                padding: '10px',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              disabled={isLoading}
              aria-label="Clear current recommendation and try again"
            >
              <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>↺</span>
              Clear & Try Again
            </button>
          </div>
        ) : hasSearched && (
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            borderRadius: '8px', 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid var(--border-color)' 
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No optimal {intent.toLowerCase()} locations found right now. Please check back as conditions update.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartSuggestions;
