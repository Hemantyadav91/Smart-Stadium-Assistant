/**
 * Tests for dashboardLogic.js
 * These tests verify the core business logic of the Smart Stadium Assistant.
 */

import { getBestSuggestion, getBestTimeToMove, getConfidenceInfo, getSuggestionMessage } from './dashboardLogic';

const mockZones = [
  { id: 1, name: 'Gate A', type: 'Exit', level: 'High', waitTime: 30 },
  { id: 2, name: 'Gate B', type: 'Exit', level: 'Low', waitTime: 5 },
  { id: 3, name: 'Main Food Court', type: 'Food', level: 'High', waitTime: 30 },
  { id: 4, name: 'Snack Deck South', type: 'Food', level: 'Medium', waitTime: 12 },
];

export const testGetBestSuggestion = () => {
  const result = getBestSuggestion(mockZones, 'Food');
  console.assert(result && result.id === 4, 'Should select Snack Deck South (12m wait)');
  
  const exitResult = getBestSuggestion(mockZones, 'Exit');
  console.assert(exitResult && exitResult.id === 2, 'Should select Gate B (5m wait)');
  
  console.log('✅ testGetBestSuggestion passed');
};

export const testGetBestTimeToMove = () => {
  console.assert(getBestTimeToMove('Low') === "Now is a great time to go!", 'Low level check');
  console.assert(getBestTimeToMove('High') === "Better to wait 10–15 minutes for crowd to reduce.", 'High level check');
  
  console.log('✅ testGetBestTimeToMove passed');
};

export const testGetConfidenceInfo = () => {
  const lowConf = getConfidenceInfo('High');
  console.assert(lowConf.label === 'Low confidence', 'High crowd = low confidence');
  
  const highConf = getConfidenceInfo('Low');
  console.assert(highConf.label === 'High confidence', 'Low crowd = high confidence');
  
  console.log('✅ testGetConfidenceInfo passed');
};

// Run tests automatically in development
if (import.meta.env?.DEV) {
  console.log('--- Running Smart Stadium Logic Tests ---');
  testGetBestSuggestion();
  testGetBestTimeToMove();
  testGetConfidenceInfo();
  console.log('--- All tests completed ---');
}
