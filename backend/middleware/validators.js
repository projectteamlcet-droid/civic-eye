const { validationResult, body, param } = require('express-validator');

// Check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// Auth validators
const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['SuperAdmin', 'ZoneOfficer', 'FieldInspector']),
  body('assignedZone').optional().trim(),
];

const loginRules = [
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Asset validators
const assetRules = [
  body('name').trim().notEmpty().withMessage('Asset name is required').isLength({ max: 200 }),
  body('type').isIn(['road', 'water', 'building']).withMessage('Type must be road, water, or building'),
  body('zone').trim().notEmpty().withMessage('Zone is required'),
  body('location.latitude').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude required'),
  body('location.longitude').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude required'),
  body('healthScore').optional().isInt({ min: 0, max: 100 }),
];

const mongoIdRule = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];

module.exports = {
  validate,
  registerRules,
  loginRules,
  assetRules,
  mongoIdRule,
};
