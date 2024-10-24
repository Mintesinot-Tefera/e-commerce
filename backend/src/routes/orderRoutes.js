
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateJWT = require('../middleware/authMiddleware');
const { validateOrder } = require('../validators/orderValidator');

// Protected Routes (User Only)
router.post('/', authenticateJWT, validateOrder, orderController.placeOrder);
router.get('/', authenticateJWT, orderController.getUserOrders);
router.get('/:id', authenticateJWT, orderController.getOrderById);

module.exports = router;
