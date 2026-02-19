const InfrastructureAsset = require('../models/InfrastructureAsset');
const Alert = require('../models/Alert');

const getRoleFilter = (user) => {
  if (user.role === 'SuperAdmin') return {};
  return { zone: user.assignedZone };
};

exports.getSummary = async (req, res, next) => {
  try {
    const filter = getRoleFilter(req.user);

    const [assets, alerts] = await Promise.all([
      InfrastructureAsset.find(filter).sort({ healthScore: 1 }),
      Alert.find({ ...(req.user.role === 'SuperAdmin' ? {} : { zone: req.user.assignedZone }), status: 'pending' }),
    ]);

    const criticalAssets = assets.filter(a => a.riskLevel === 'high');
    const avgHealth = assets.length > 0
      ? Math.round(assets.reduce((s, a) => s + a.healthScore, 0) / assets.length)
      : 0;

    // Zone-wise breakdown
    const zoneMap = {};
    assets.forEach(a => {
      if (!zoneMap[a.zone]) zoneMap[a.zone] = { total: 0, avgHealth: 0, critical: 0, healthSum: 0 };
      zoneMap[a.zone].total++;
      zoneMap[a.zone].healthSum += a.healthScore;
      if (a.riskLevel === 'high') zoneMap[a.zone].critical++;
    });
    Object.keys(zoneMap).forEach(z => {
      zoneMap[z].avgHealth = Math.round(zoneMap[z].healthSum / zoneMap[z].total);
      delete zoneMap[z].healthSum;
    });

    // Priority ranking (top 10 worst)
    const priorityRanking = assets.slice(0, 10).map((a, i) => ({
      rank: i + 1,
      id: a._id,
      name: a.name,
      type: a.type,
      zone: a.zone,
      healthScore: a.healthScore,
      riskLevel: a.riskLevel,
      status: a.status,
    }));

    res.json({
      success: true,
      data: {
        totalAssets: assets.length,
        criticalCount: criticalAssets.length,
        infrastructureHealthIndex: avgHealth,
        pendingAlerts: alerts.length,
        priorityRanking,
        zoneComparison: zoneMap,
      },
    });
  } catch (error) {
    next(error);
  }
};
