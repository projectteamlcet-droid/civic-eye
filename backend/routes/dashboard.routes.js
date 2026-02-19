const router = require('express').Router();
const { getOverview, getHeatmapData } = require('../controllers/dashboard.controller');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/overview', getOverview);
router.get('/heatmap', getHeatmapData);

module.exports = router;
