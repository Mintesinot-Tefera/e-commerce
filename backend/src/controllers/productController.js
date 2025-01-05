const db = require('../config/db');
// const redisClient = require('../config/redisClient'); // Import Redis client
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


// Create a new product
const createProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    try {
        const sql = 'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)';
        const values = [name, description, price, stock, category];
        const result = await query(sql, values);

        const newProduct = {
            id: result.insertId,
            name,
            description,
            price,
            stock,
            category,
            created_at: new Date(),
            updated_at: new Date()
        };

        //  // Invalidate the products cache
        //  await redisClient.del('products:all');
        logger.info(`Product created: ${name} (ID: ${result.insertId}) by User ID: ${req.user.id}`);
        res.status(201).json({ message: 'Product created successfully.', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        logger.error(`Error creating product ${name}: ${error.stack}`);
        res.status(500).json({ message: 'Server error.' });
    }
};



// Get all products (public)
const getAllProducts = async (req, res) => {
    try {
        const sql = 'SELECT * FROM products';
        const products = await query(sql);

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

const getRecentProducts = async (req, res) => {
    try {
        // Fetch the 20 most recent products based on "dateofregistration"
        const sql = 'SELECT * FROM products ORDER BY dateofregistration DESC LIMIT 20';
        const products = await query(sql);

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching recent products:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};


const getProductsByCategory = async (req, res) => {
    const { subcategory } = req.query; // Extract the category from query parameters

    if (!subcategory) {
        return res.status(400).json({ message: 'Category is required.' });
    }

    try {
        // Fetch products that match the given category
        const sql = 'SELECT * FROM products WHERE subcategory = ?';
        const products = await query(sql, [subcategory]);

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};







// Get a specific product by ID (public)
const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const sql = 'SELECT * FROM products WHERE id = ?';
        const products = await query(sql, [productId]);

        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json(products[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};





// Update product details (Admin only)
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stock, category } = req.body;

    try {
        // Check if the product exists
        const checkSql = 'SELECT * FROM products WHERE id = ?';
        const products = await query(checkSql, [productId]);

        if (products.length === 0) {
            logger.warn(`Product update attempted on non-existent product ID: ${productId}`);
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Update the product
        const updateFields = [];
        const values = [];

        if (name) {
            updateFields.push('name = ?');
            values.push(name);
        }
        if (description) {
            updateFields.push('description = ?');
            values.push(description);
        }
        if (price) {
            updateFields.push('price = ?');
            values.push(price);
        }
        if (stock) {
            updateFields.push('stock = ?');
            values.push(stock);
        }
        if (category) {
            updateFields.push('category = ?');
            values.push(category);
        }

        if (updateFields.length === 0) {
            logger.warn(`No fields provided for product update for ID: ${productId}`);
            return res.status(400).json({ message: 'No fields provided to update.' });
        }

        const sql = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;
        values.push(productId);
        await query(sql, values);

        // // Invalidate the products cache
        // await redisClient.del('products:all');

        logger.info(`Product updated: ID ${productId} by User ID: ${req.user.id}`);

        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error('Error updating product:', error);
        logger.error(`Error updating product ID ${productId}: ${error.stack}`);
        
        res.status(500).json({ message: 'Server error.' });
    }
};


// Delete a product (Admin only)
const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        // Check if the product exists
        const checkSql = 'SELECT * FROM products WHERE id = ?';
        const products = await query(checkSql, [productId]);

        if (products.length === 0) {
            logger.warn(`Product deletion attempted on non-existent product ID: ${productId}`);
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Delete the product
        const deleteSql = 'DELETE FROM products WHERE id = ?';
        await query(deleteSql, [productId]);

        //  // Invalidate the products cache
        //  await redisClient.del('products:all');

        logger.info(`Product deleted: ID ${productId} by User ID: ${req.user.id}`);

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        logger.error(`Error deleting product ID ${productId}: ${error.stack}`);
        res.status(500).json({ message: 'Server error.' });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getRecentProducts,
    getProductsByCategory,
    getProductById,
    updateProduct,
    deleteProduct
};











