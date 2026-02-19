const Alert = require('../models/Alert');
const { determineSeverity } = require('./riskEngine');

const createAlertForAsset = async (asset, riskScore, alertType) => {
  const alert = await Alert.create({
    assetId: asset._id,
    assetName: asset.name,
    zone: asset.zone,
    riskScore,
    alertType,
    severity: determineSeverity(riskScore),
    description: `Automated alert: ${alertType} detected on ${asset.name} with risk score ${riskScore}`,
  });
  return alert;
};

module.exports = { createAlertForAsset };
