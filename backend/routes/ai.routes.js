const router = require('express').Router();
const { analyzeAsset, getAnalysisHistory } = require('../controllers/ai.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { body, param } = require('express-validator');
const { validate } = require('../middleware/validators');

router.use(authenticate);

router.post('/analyze',
  authorize('SuperAdmin', 'ZoneOfficer', 'FieldInspector'),
  body('assetId').isMongoId().withMessage('Valid asset ID required'),
  validate,
  analyzeAsset
);

router.get('/history/:assetId',
  param('assetId').isMongoId().withMessage('Valid asset ID required'),
  validate,
  getAnalysisHistory
);

module.exports = router;
