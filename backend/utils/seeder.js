/**
 * Database Seeder
 * Run: node utils/seeder.js
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env.example' });

const User = require('../models/User');
const InfrastructureAsset = require('../models/InfrastructureAsset');
const Alert = require('../models/Alert');

const config = require('../config/env');

const seedData = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([User.deleteMany(), InfrastructureAsset.deleteMany(), Alert.deleteMany()]);

    // Create users
    const users = await User.create([
      { name: 'City Admin', email: 'admin@civicai.com', password: 'admin123', role: 'SuperAdmin' },
      { name: 'Zone A Officer', email: 'zonea@civicai.com', password: 'officer123', role: 'ZoneOfficer', assignedZone: 'Zone A' },
      { name: 'Field Inspector 1', email: 'inspector@civicai.com', password: 'inspector123', role: 'FieldInspector', assignedZone: 'Zone A' },
    ]);

    // Create assets
    const assets = await InfrastructureAsset.create([
      { name: 'MG Road Flyover', type: 'road', zone: 'Zone A', location: { latitude: 12.9716, longitude: 77.5946 }, healthScore: 34, riskLevel: 'high', createdBy: users[0]._id, history: [{ score: 34, riskLevel: 'high' }] },
      { name: 'Koramangala Water Main', type: 'water', zone: 'Zone B', location: { latitude: 12.9352, longitude: 77.6245 }, healthScore: 72, riskLevel: 'medium', createdBy: users[0]._id, history: [{ score: 72, riskLevel: 'medium' }] },
      { name: 'Indiranagar Bridge', type: 'road', zone: 'Zone A', location: { latitude: 12.9784, longitude: 77.6408 }, healthScore: 88, riskLevel: 'low', createdBy: users[0]._id, history: [{ score: 88, riskLevel: 'low' }] },
      { name: 'Whitefield Treatment Plant', type: 'water', zone: 'Zone C', location: { latitude: 12.9698, longitude: 77.7500 }, healthScore: 45, riskLevel: 'medium', createdBy: users[0]._id, history: [{ score: 45, riskLevel: 'medium' }] },
      { name: 'Jayanagar Community Hall', type: 'building', zone: 'Zone B', location: { latitude: 12.9250, longitude: 77.5830 }, healthScore: 91, riskLevel: 'low', createdBy: users[0]._id, history: [{ score: 91, riskLevel: 'low' }] },
      { name: 'Hebbal Flyover Section B', type: 'road', zone: 'Zone A', location: { latitude: 13.0358, longitude: 77.5970 }, healthScore: 28, riskLevel: 'high', createdBy: users[0]._id, history: [{ score: 28, riskLevel: 'high' }] },
    ]);

    // Assign assets to field inspector
    users[2].assignedAssets = [assets[0]._id, assets[2]._id, assets[5]._id];
    await users[2].save();

    // Create alerts
    await Alert.create([
      { assetId: assets[0]._id, assetName: 'MG Road Flyover', zone: 'Zone A', riskScore: 89, alertType: 'Structural Crack Detected', severity: 'critical', status: 'pending' },
      { assetId: assets[5]._id, assetName: 'Hebbal Flyover Section B', zone: 'Zone A', riskScore: 94, alertType: 'Load Bearing Failure Risk', severity: 'critical', status: 'pending' },
      { assetId: assets[3]._id, assetName: 'Whitefield Treatment Plant', zone: 'Zone C', riskScore: 72, alertType: 'Water Quality Below Threshold', severity: 'high', status: 'resolved' },
    ]);

    console.log('Seed data inserted successfully!');
    console.log('\nTest Accounts:');
    console.log('  SuperAdmin:      admin@civicai.com / admin123');
    console.log('  ZoneOfficer:     zonea@civicai.com / officer123');
    console.log('  FieldInspector:  inspector@civicai.com / inspector123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
