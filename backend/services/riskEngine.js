/**
 * Risk Scoring Engine
 * Calculates health scores and determines risk levels
 */

const calculateRiskLevel = (healthScore) => {
  if (healthScore <= 40) return 'high';
  if (healthScore <= 70) return 'medium';
  return 'low';
};

const determineSeverity = (riskScore) => {
  if (riskScore >= 90) return 'critical';
  if (riskScore >= 70) return 'high';
  if (riskScore >= 50) return 'medium';
  return 'low';
};

const shouldTriggerAlert = (riskScore, previousScore = null) => {
  // Alert if risk score > 70
  if (riskScore > 70) return true;
  // Alert if sudden drop (> 20 points)
  if (previousScore !== null && (previousScore - (100 - riskScore)) > 20) return true;
  return false;
};

const calculateHealthTrend = (history) => {
  if (!history || history.length < 2) return 'stable';
  const recent = history.slice(-3);
  const avgRecent = recent.reduce((s, h) => s + h.score, 0) / recent.length;
  const older = history.slice(-6, -3);
  if (older.length === 0) return 'stable';
  const avgOlder = older.reduce((s, h) => s + h.score, 0) / older.length;
  if (avgRecent < avgOlder - 10) return 'declining';
  if (avgRecent > avgOlder + 10) return 'improving';
  return 'stable';
};

module.exports = {
  calculateRiskLevel,
  determineSeverity,
  shouldTriggerAlert,
  calculateHealthTrend,
};
