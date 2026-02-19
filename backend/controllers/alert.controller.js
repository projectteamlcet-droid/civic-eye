const Alert = require('../models/Alert');

const getRoleFilter = (user) => {
  if (user.role === 'SuperAdmin') return {};
  return { zone: user.assignedZone };
};

exports.getAllAlerts = async (req, res, next) => {
  try {
    const filter = getRoleFilter(req.user);
    const { status, severity, page = 1, limit = 50 } = req.query;
    if (status) filter.status = status;
    if (severity) filter.severity = severity;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [alerts, total] = await Promise.all([
      Alert.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).populate('assetId', 'name type'),
      Alert.countDocuments(filter),
    ]);

    res.json({ success: true, data: alerts, pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) } });
  } catch (error) {
    next(error);
  }
};

exports.getCriticalAlerts = async (req, res, next) => {
  try {
    const filter = { ...getRoleFilter(req.user), severity: { $in: ['critical', 'high'] }, status: 'pending' };
    const alerts = await Alert.find(filter).sort({ riskScore: -1 }).limit(20).populate('assetId', 'name type');
    res.json({ success: true, data: alerts });
  } catch (error) {
    next(error);
  }
};

exports.updateAlertStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'resolved'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be pending or resolved' });
    }
    const alert = await Alert.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!alert) return res.status(404).json({ success: false, message: 'Alert not found' });
    res.json({ success: true, data: alert });
  } catch (error) {
    next(error);
  }
};
