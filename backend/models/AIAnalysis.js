const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InfrastructureAsset',
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  damageType: {
    type: String,
    required: true,
  },
  confidenceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  riskScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  analyzedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('AIAnalysis', analysisSchema);
