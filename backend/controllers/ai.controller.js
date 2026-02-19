const InfrastructureAsset = require('../models/InfrastructureAsset');
const AIAnalysis = require('../models/AIAnalysis');
const { simulateAnalysis } = require('../services/aiService');
const { calculateRiskLevel, shouldTriggerAlert } = require('../services/riskEngine');
const { createAlertForAsset } = require('../services/alertService');

exports.analyzeAsset = async (req, res, next) => {
  try {
    const { assetId } = req.body;

    const asset = await InfrastructureAsset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    // Simulate AI analysis
    const result = simulateAnalysis(asset.type);

    // Save analysis record
    const analysis = await AIAnalysis.create({
      assetId: asset._id,
      damageType: result.damageType,
      confidenceScore: result.confidenceScore,
      riskScore: result.riskScore,
      severity: result.severity,
      explanation: result.explanation,
      analyzedBy: req.user._id,
    });

    // Update asset
    const previousScore = asset.healthScore;
    asset.healthScore = result.newHealthScore;
    asset.riskLevel = calculateRiskLevel(result.newHealthScore);
    asset.lastInspectionDate = new Date();
    asset.history.push({
      score: result.newHealthScore,
      riskLevel: asset.riskLevel,
      source: 'ai_analysis',
    });
    await asset.save();

    // Trigger alert if needed
    let alert = null;
    if (shouldTriggerAlert(result.riskScore, previousScore)) {
      alert = await createAlertForAsset(asset, result.riskScore, result.damageType);
    }

    res.json({
      success: true,
      data: {
        analysis,
        updatedAsset: {
          id: asset._id,
          name: asset.name,
          healthScore: asset.healthScore,
          riskLevel: asset.riskLevel,
        },
        alertTriggered: !!alert,
        alert,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAnalysisHistory = async (req, res, next) => {
  try {
    const analyses = await AIAnalysis.find({ assetId: req.params.assetId })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('analyzedBy', 'name');
    res.json({ success: true, data: analyses });
  } catch (error) {
    next(error);
  }
};
