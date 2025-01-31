const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const { validateProduct, validateProductUpdate } = require('../validators/productValidator');

// Public Routes
// router.get('/', productController.getAllProducts);
router.get('/', productController.getProductsByCategory);
router.get('/recents', productController.getRecentProducts);
// router.get('/:subcategory', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);
// router.get('/recents', productController.getRecentProducts);


// Admin Routes
router.post('/', authenticateJWT, authorizeRoles('admin'), validateProduct, productController.createProduct);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), validateProductUpdate, productController.updateProduct);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;
