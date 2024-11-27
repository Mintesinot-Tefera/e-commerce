const db = require('../config/db');
const logger = require('../config/logger');

// Helper function to handle database queries with Promises
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Place a new order (User only)
const placeOrder = async (req, res) => {
    const userId = req.user.id;
    const { products } = req.body; // Expecting an array of { product_id, quantity }

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'No products provided for the order.' });
    }

    try {
        // Start a transaction
        await query('START TRANSACTION');

        let totalPrice = 0;
        const productDetails = [];

        // Iterate over each product to check stock and calculate total price
        for (const item of products) {
            const { product_id, quantity } = item;

            // Fetch product details
            const productResult = await query('SELECT * FROM products WHERE id = ?', [product_id]);

            if (productResult.length === 0) {
                await query('ROLLBACK');
                logger.warn(`Order placement failed: Product ID ${product_id} not found for User ID ${userId}`);
                return res.status(404).json({ message: `Product with ID ${product_id} not found.` });
            }

            const product = productResult[0];

            if (product.stock < quantity) {
                await query('ROLLBACK');
                logger.warn(`Order placement failed: Insufficient stock for Product ID ${product_id} by User ID ${userId}`);
                return res.status(400).json({ message: `Insufficient stock for product '${product.name}'. Available: ${product.stock}, Requested: ${quantity}` });
            }

            // Calculate price
            const itemTotal = parseFloat(product.price) * quantity;
            totalPrice += itemTotal;

            // Push details for later use
            productDetails.push({
                product_id,
                quantity,
                price: product.price
            });
        }

        // Insert into orders table
        const insertOrderResult = await query('INSERT INTO orders (user_id, total_price) VALUES (?, ?)', [userId, totalPrice]);
        const orderId = insertOrderResult.insertId;

        // Insert into order_items table and update product stock
        for (const item of productDetails) {
            const { product_id, quantity, price } = item;

            // Insert order item
            await query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [orderId, product_id, quantity, price]);

            // Update product stock
            await query('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, product_id]);
        }

        // Commit the transaction
        await query('COMMIT');

        logger.info(`Order placed: Order ID ${orderId} by User ID ${userId} with Total Price $${totalPrice}`);
        res.status(201).json({ message: 'Order placed successfully.', order_id: orderId });
    } catch (error) {
        // Rollback in case of any error
        await query('ROLLBACK');
        console.error('Error placing order:', error);
        logger.error(`Error placing order for User ID ${userId}: ${error.stack}`);
        res.status(500).json({ message: 'Server error while placing the order.' });
    }
};

// Get all orders for the authenticated user
const getUserOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await query('SELECT * FROM orders WHERE user_id = ?', [userId]);

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Server error while fetching orders.' });
    }
};

// Get details of a specific order
const getOrderById = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;

    try {
        // Fetch the order
        const orderResult = await query('SELECT * FROM orders WHERE order_id = ?', [orderId]);

        if (orderResult.length === 0) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        const order = orderResult[0];

        // Ensure the order belongs to the authenticated user
        if (order.user_id !== userId) {
            return res.status(403).json({ message: 'Access denied. You do not own this order.' });
        }

        // Fetch order items
        const items = await query('SELECT oi.*, p.name, p.description, p.category FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?', [orderId]);

        res.status(200).json({ ...order, items });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Server error while fetching order details.' });
    }
};

module.exports = {
    placeOrder,
    getUserOrders,
    getOrderById
};














