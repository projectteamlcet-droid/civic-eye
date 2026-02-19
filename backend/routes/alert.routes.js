const router = require('express').Router();
const { getAllAlerts, getCriticalAlerts, updateAlertStatus } = require('../controllers/alert.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { mongoIdRule, validate } = require('../middleware/validators');

router.use(authenticate);

router.get('/', getAllAlerts);
router.get('/critical', getCriticalAlerts);
router.put('/:id/status', authorize('SuperAdmin', 'ZoneOfficer'), mongoIdRule, validate, updateAlertStatus);

module.exports = router;
