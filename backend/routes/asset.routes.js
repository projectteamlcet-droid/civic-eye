const router = require('express').Router();
const { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset } = require('../controllers/asset.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { assetRules, mongoIdRule, validate } = require('../middleware/validators');

router.use(authenticate);

router.route('/')
  .get(getAllAssets)
  .post(authorize('SuperAdmin', 'ZoneOfficer'), assetRules, validate, createAsset);

router.route('/:id')
  .get(mongoIdRule, validate, getAssetById)
  .put(authorize('SuperAdmin', 'ZoneOfficer'), mongoIdRule, validate, updateAsset)
  .delete(authorize('SuperAdmin'), mongoIdRule, validate, deleteAsset);

module.exports = router;
