const InfrastructureAsset = require('../models/InfrastructureAsset');
const { calculateRiskLevel } = require('../services/riskEngine');

// Role-based query filter
const getRoleFilter = (user) => {
  if (user.role === 'SuperAdmin') return {};
  if (user.role === 'ZoneOfficer') return { zone: user.assignedZone };
  if (user.role === 'FieldInspector') return { _id: { $in: user.assignedAssets || [] } };
  return {};
};

exports.createAsset = async (req, res, next) => {
  try {
    const { name, type, zone, location, healthScore } = req.body;
    const riskLevel = calculateRiskLevel(healthScore || 100);

    const asset = await InfrastructureAsset.create({
      name, type, zone, location,
      healthScore: healthScore || 100,
      riskLevel,
      createdBy: req.user._id,
      history: [{ score: healthScore || 100, riskLevel, source: 'manual' }],
    });

    res.status(201).json({ success: true, data: asset });
  } catch (error) {
    next(error);
  }
};

exports.getAllAssets = async (req, res, next) => {
  try {
    const filter = getRoleFilter(req.user);
    const { type, riskLevel, zone, page = 1, limit = 50 } = req.query;

    if (type) filter.type = type;
    if (riskLevel) filter.riskLevel = riskLevel;
    if (zone && req.user.role === 'SuperAdmin') filter.zone = zone;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [assets, total] = await Promise.all([
      InfrastructureAsset.find(filter).sort({ healthScore: 1 }).skip(skip).limit(parseInt(limit)).populate('createdBy', 'name'),
      InfrastructureAsset.countDocuments(filter),
    ]);

    res.json({ success: true, data: assets, pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) } });
  } catch (error) {
    next(error);
  }
};

exports.getAssetById = async (req, res, next) => {
  try {
    const asset = await InfrastructureAsset.findById(req.params.id).populate('createdBy', 'name');
    if (!asset) return res.status(404).json({ success: false, message: 'Asset not found' });
    res.json({ success: true, data: asset });
  } catch (error) {
    next(error);
  }
};

exports.updateAsset = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.healthScore !== undefined) {
      updates.riskLevel = calculateRiskLevel(updates.healthScore);
    }

    const asset = await InfrastructureAsset.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!asset) return res.status(404).json({ success: false, message: 'Asset not found' });

    // Add to history if health score changed
    if (updates.healthScore !== undefined) {
      asset.history.push({ score: updates.healthScore, riskLevel: asset.riskLevel, source: 'manual' });
      await asset.save();
    }

    res.json({ success: true, data: asset });
  } catch (error) {
    next(error);
  }
};

exports.deleteAsset = async (req, res, next) => {
  try {
    const asset = await InfrastructureAsset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ success: false, message: 'Asset not found' });
    res.json({ success: true, message: 'Asset deleted' });
  } catch (error) {
    next(error);
  }
};
