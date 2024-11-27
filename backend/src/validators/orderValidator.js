const { body, validationResult } = require('express-validator');

// Validation rules for placing an order
const validateOrder = [
    body('products')
        .isArray({ min: 1 }).withMessage('Products should be an array with at least one product.'),
    body('products.*.product_id')
        .isInt({ gt: 0 }).withMessage('Product ID must be a positive integer.'),
    body('products.*.quantity')
        .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer.'),
    // Middleware to handle validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return all error messages
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateOrder
};
