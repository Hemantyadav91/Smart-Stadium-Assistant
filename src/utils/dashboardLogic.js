/**
 * Logic utilities for the Smart Stadium Dashboard
 */

/**
 * Finds the best zone (lowest wait time) for a given intent.
 * @param {Array} zones - List of stadium zones
 * @param {string} intent - The user's category (Food, Washroom, Exit)
 * @returns {Object|null} - The best zone or null if none found
 */
export const getBestSuggestion = (zones, intent) => {
  if (!zones || !Array.isArray(zones) || zones.length === 0) return null;
  
  const relevantZones = zones.slice().filter(z => z.type === intent);
  if (relevantZones.length === 0) return null;
  
  return relevantZones.reduce((prev, curr) => (prev.waitTime < curr.waitTime ? prev : curr));
};

/**
 * Returns a predictive timing insight based on crowd level.
 * @param {string} level - Crowd level (Low, Medium, High)
 * @returns {string}
 */
export const getBestTimeToMove = (level) => {
  switch (level) {
    case 'Low': return "Now is a great time to go!";
    case 'Medium': return "Try within the next 5–10 minutes.";
    case 'High': return "Better to wait 10–15 minutes for crowd to reduce.";
    default: return "";
  }
};

/**
 * Returns confidence metadata based on crowd level.
 * @param {string} level - Crowd level (Low, Medium, High)
 * @returns {Object}
 */
export const getConfidenceInfo = (level) => {
  switch (level) {
    case 'Low': return { label: 'High confidence', color: '#10b981' };
    case 'Medium': return { label: 'Moderate confidence', color: '#f59e0b' };
    case 'High': return { label: 'Low confidence', color: '#ef4444' };
    default: return { label: 'Standard', color: '#94a3b8' };
  }
};

/**
 * Generates an alert message for a crowded zone.
 */
export const getAlertMessage = (zone) => {
  if (!zone) return "";
  return `Avoid ${zone.name} — high congestion detected. Estimated delay: ${zone.waitTime} mins.`;
};

/**
 * Generates a descriptive suggestion message for a specific zone and intent.
 */
export const getSuggestionMessage = (zone, intent) => {
  if (!zone) return "";
  const action = intent === 'Exit' ? 'exit faster' : intent === 'Food' ? 'grab food quicker' : 'avoid the rush';
  return `Head to ${zone.name} — it currently has the lowest wait time (${zone.waitTime} mins) and a ${zone.level} crowd. This will help you ${action}.`;
};
