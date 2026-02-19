const router = require('express').Router();
const { getSummary } = require('../controllers/report.controller');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/summary', getSummary);

module.exports = router;
