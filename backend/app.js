// Import Express
const express = require('express');
// const db = require('./src/config/db'); // Import the database connection
// const dotenv = require('dotenv');
require('dotenv').config(); // Load environment variables

const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const morgan = require('morgan');
const logger = require('./src/config/logger'); // Import the Winston logger
const cors = require('cors');



// require('dotenv').config(); // Load environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Secret Key from Stripe Dashboard

// dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(bodyParser.json());
app.use(cors());  // Allow all origins or specify origin if needed
app.use(express.json()); // Parse incoming JSON data



// // Setup morgan to use Winston's stream
// app.use(morgan('combined', { stream: logger.stream }));

// Setup morgan to use Winston's stream with response time
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: logger.stream }));


// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// API Route for creating a Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  
  console.log('Request received at /create-checkout-session');
  
    
    try {
      const { cartItems } = req.body; // Cart items from frontend
  
      // Map cart items to Stripe's expected format
      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.imageUrl1], // Product image
          },
          unit_amount: item.price * 100, // Stripe expects amount in cents
        },
        quantity: item.quantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], // Payment methods (can add more)
        mode: 'payment', // 'payment' means one-time payment
        line_items: lineItems,
        success_url: `${process.env.CLIENT_URL}/success`, // URL to go to on success
        cancel_url: `${process.env.CLIENT_URL}/cancel`, // URL to go to on cancel
      });
  
      res.json({ id: session.id }); // Return session ID to frontend
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  



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



// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
