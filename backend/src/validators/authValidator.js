const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('username')
    .notEmpty()
    .withMessage('Username is required.')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long.'),

  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email format.'),

  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the first error message
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }


];

const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email format.'),

  body('password')
    .notEmpty()
    .withMessage('Password is required.'),
  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the first error message
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateRegister,
  validateLogin,
};
