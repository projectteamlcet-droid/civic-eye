const InfrastructureAsset = require('../models/InfrastructureAsset');
const Alert = require('../models/Alert');

const getRoleFilter = (user) => {
  if (user.role === 'SuperAdmin') return {};
  if (user.role === 'ZoneOfficer') return { zone: user.assignedZone };
  return { _id: { $in: user.assignedAssets || [] } };
};

exports.getOverview = async (req, res, next) => {
  try {
    const filter = getRoleFilter(req.user);

    const [assets, criticalCount, activeAlerts] = await Promise.all([
      InfrastructureAsset.find(filter),
      InfrastructureAsset.countDocuments({ ...filter, riskLevel: 'high' }),
      Alert.countDocuments({ ...(req.user.role === 'SuperAdmin' ? {} : { zone: req.user.assignedZone }), status: 'pending' }),
    ]);

    const totalAssets = assets.length;
    const avgHealth = totalAssets > 0
      ? Math.round(assets.reduce((sum, a) => sum + a.healthScore, 0) / totalAssets)
      : 0;

    // Risk distribution
    const riskDistribution = { low: 0, medium: 0, high: 0 };
    const typeDistribution = { road: 0, water: 0, building: 0 };
    assets.forEach(a => {
      riskDistribution[a.riskLevel]++;
      typeDistribution[a.type]++;
    });

    res.json({
      success: true,
      data: {
        totalAssets,
        criticalAssets: criticalCount,
        averageHealthScore: avgHealth,
        activeAlerts,
        riskDistribution,
        typeDistribution,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getHeatmapData = async (req, res, next) => {
  try {
    const filter = getRoleFilter(req.user);
    const assets = await InfrastructureAsset.find(filter)
      .select('name type zone location healthScore riskLevel status');

    res.json({ success: true, data: assets });
  } catch (error) {
    next(error);
  }
};
