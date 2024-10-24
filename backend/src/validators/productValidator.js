const { body, validationResult } = require('express-validator');

// Validation rules for creating a product
const validateProduct = [
    body('name')
        .notEmpty().withMessage('Product name is required.')
        .isLength({ max: 100 }).withMessage('Product name must be at most 100 characters long.'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string.'),
    body('price')
        .notEmpty().withMessage('Price is required.')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number.'),
    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer.'),
    body('category')
        .optional()
        .isLength({ max: 50 }).withMessage('Category must be at most 50 characters long.'),
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

// Validation rules for updating a product
const validateProductUpdate = [
    body('name')
        .optional()
        .isLength({ max: 100 }).withMessage('Product name must be at most 100 characters long.'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string.'),
    body('price')
        .optional()
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number.'),
    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer.'),
    body('category')
        .optional()
        .isLength({ max: 50 }).withMessage('Category must be at most 50 characters long.'),
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
    validateProduct,
    validateProductUpdate
};
