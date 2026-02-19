const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  score: { type: Number, required: true, min: 0, max: 100 },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
  recordedAt: { type: Date, default: Date.now },
  source: { type: String, default: 'manual' }, // manual | ai_analysis
});

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Asset name is required'],
    trim: true,
    maxlength: 200,
  },
  type: {
    type: String,
    enum: ['road', 'water', 'building'],
    required: [true, 'Asset type is required'],
  },
  zone: {
    type: String,
    required: [true, 'Zone is required'],
    trim: true,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  healthScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 100,
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  lastInspectionDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['good', 'monitoring', 'scheduled', 'under_review', 'needs_repair', 'critical', 'urgent'],
    default: 'good',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  history: [healthRecordSchema],
}, { timestamps: true });

// Index for geo queries and zone filtering
assetSchema.index({ zone: 1 });
assetSchema.index({ riskLevel: 1 });
assetSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });

module.exports = mongoose.model('InfrastructureAsset', assetSchema);
