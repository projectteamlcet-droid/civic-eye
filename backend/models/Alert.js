const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InfrastructureAsset',
    required: true,
  },
  assetName: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  riskScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  alertType: {
    type: String,
    required: true,
    trim: true,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending',
  },
  description: {
    type: String,
    default: '',
  },
}, { timestamps: true });

alertSchema.index({ status: 1, severity: 1 });
alertSchema.index({ zone: 1 });

module.exports = mongoose.model('Alert', alertSchema);
