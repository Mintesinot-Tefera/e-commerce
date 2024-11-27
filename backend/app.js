// Import Express
const express = require('express');
// const db = require('./src/config/db'); // Import the database connection
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const morgan = require('morgan');
const logger = require('./src/config/logger'); // Import the Winston logger
const cors = require('cors');



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors());  // Allow all origins or specify origin if needed


// // Setup morgan to use Winston's stream
// app.use(morgan('combined', { stream: logger.stream }));

// Setup morgan to use Winston's stream with response time
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: logger.stream }));


// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Authentication & Authorization API');
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Error Handler (Should be after all other middleware and routes)
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


