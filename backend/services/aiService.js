/**
 * AI Analysis Service
 * Simulates AI-based infrastructure damage detection
 */

const damageTypes = {
  road: [
    { type: 'Pothole', explanations: ['Large pothole with exposed aggregate. Immediate repair needed.', 'Moderate pothole forming at road junction. Traffic hazard.'] },
    { type: 'Longitudinal Crack', explanations: ['Deep crack along road surface indicating subgrade failure.', 'Surface crack propagating due to thermal expansion.'] },
    { type: 'Surface Erosion', explanations: ['Water runoff causing surface degradation.', 'Bitumen stripping observed on surface layer.'] },
    { type: 'Rutting', explanations: ['Permanent deformation in wheel paths.', 'Heavy vehicle load causing structural deformation.'] },
  ],
  water: [
    { type: 'Pipe Corrosion', explanations: ['Significant corrosion on pipe exterior. Leak risk elevated.', 'Internal corrosion reducing water flow capacity.'] },
    { type: 'Contamination Detected', explanations: ['Chemical contamination above safe threshold.', 'Biological agents detected in water sample.'] },
    { type: 'Pressure Anomaly', explanations: ['Unusual pressure drop indicating possible leak.', 'Pressure spike detected — valve malfunction suspected.'] },
    { type: 'Sediment Buildup', explanations: ['Sediment accumulation reducing pipe diameter.', 'Mineral deposits causing flow restriction.'] },
  ],
  building: [
    { type: 'Structural Crack', explanations: ['Load-bearing wall showing stress fractures.', 'Foundation settling causing wall separation.'] },
    { type: 'Water Damage', explanations: ['Moisture infiltration causing material degradation.', 'Roof leak causing ceiling and wall damage.'] },
    { type: 'Electrical Hazard', explanations: ['Exposed wiring detected in public area.', 'Overloaded circuit panel requiring upgrade.'] },
    { type: 'Foundation Issue', explanations: ['Uneven settlement observed. Structural assessment needed.', 'Soil erosion undermining foundation stability.'] },
  ],
};

const simulateAnalysis = (assetType) => {
  const types = damageTypes[assetType] || damageTypes.road;
  const damage = types[Math.floor(Math.random() * types.length)];

  const confidenceScore = parseFloat((70 + Math.random() * 28).toFixed(1));
  const riskScore = Math.floor(30 + Math.random() * 65);
  const explanation = damage.explanations[Math.floor(Math.random() * damage.explanations.length)];

  const { determineSeverity } = require('./riskEngine');

  return {
    damageType: damage.type,
    confidenceScore,
    riskScore,
    severity: determineSeverity(riskScore),
    explanation,
    newHealthScore: Math.max(0, 100 - riskScore),
  };
};

module.exports = { simulateAnalysis };
