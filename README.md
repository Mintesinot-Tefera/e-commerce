# E-Commerce

## Description
This project is a web-based e-commerce platform for a supermarket. It enables users to browse products, manage their carts, and place orders. The system integrates a React.js frontend with a Node.js backend and utilizes MySQL for data storage. Stripe Checkout is integrated for seamless payment processing.

## Features
User Authentication: Registration and login with JWT-based authentication.
Product Management: View products with support for categories and detailed descriptions.
Cart System: Add, update, and remove items in the cart.
Order Placement: Place and view orders with live price calculation.
Payment Integration: Secure payments using Stripe Checkout.
Responsive Design: Fully responsive UI for both desktop and mobile.
### Prerequisites
Ensure you have the following installed:

Node.js (v14.x or higher)
MySQL
Git (for cloning the repository)
Stripe account (for payment integration)
Setup Instructions
Step 1: Clone the repository
bash
```
git clone https://github.com/Mintesinot-Tefera/e-commerce.git
cd e-commerce
```  

Step 2: Install dependencies
For the backend:

```
cd backend  
npm install  
```
For the frontend:

```
cd ../frontend  
npm install  
```
Step 3: Set up environment variables
For the backend, create a .env file in the backend directory with the following content:

dotenv
```
PORT=5000  
JWT_SECRET=your_jwt_secret  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=  
DB_NAME=supermarket  
STRIPE_SECRET_KEY=your_stripe_secret_key  
STRIPE_WEBHOOK_SECRET=your_webhook_secret  
```
For the frontend, create a .env file in the frontend directory with the following content:

dotenv
```
REACT_APP_API_URL=http://localhost:5000  
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key  
```
Step 4: Set up the MySQL database
Start your MySQL server and create a new database:

sql
```
CREATE DATABASE ecommerce;  
```
Run the following SQL scripts to create necessary tables:

sql
```
CREATE TABLE IF NOT EXISTS users (  
  id INT AUTO_INCREMENT PRIMARY KEY,  
  username VARCHAR(50) NOT NULL,  
  email VARCHAR(100) NOT NULL UNIQUE,  
  password VARCHAR(255) NOT NULL,  
  role ENUM('user', 'admin') DEFAULT 'user',  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);  
```
```
CREATE TABLE IF NOT EXISTS products (  
  id INT AUTO_INCREMENT PRIMARY KEY,  
  name VARCHAR(255) NOT NULL,  
  description TEXT,  
  price DECIMAL(10,2) NOT NULL,  
  stock INT DEFAULT 0 NOT NULL,  
  category VARCHAR(255),  
  imageUrl VARCHAR(255),  
  imageUrl2 VARCHAR(255)  
);  
```
```
CREATE TABLE IF NOT EXISTS orders (  
  id INT AUTO_INCREMENT PRIMARY KEY,  
  user_id INT NOT NULL,  
  total_price DECIMAL(10,2) NOT NULL,  
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
);  
```
```
CREATE TABLE IF NOT EXISTS order_items (  
  id INT AUTO_INCREMENT PRIMARY KEY,  
  order_id INT NOT NULL,  
  product_id INT NOT NULL,  
  quantity INT NOT NULL,  
  price DECIMAL(10,2) NOT NULL,  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE  
); 
``` 
Step 5: Start the application
Start the backend:

```
cd backend  
npm start
```  
Start the frontend:

````
cd ../frontend  
npm start
````  
Your website will now be running at http://localhost:3000.

API Endpoints
Auth
POST /auth/register: Register a new user
POST /auth/login: Login a user and return a JWT token
Products
GET /products: Retrieve all products
GET /products/:id: Retrieve a product by ID
POST /products: Add a new product (Admin only)
PUT /products/:id: Update a product (Admin only)
DELETE /products/:id: Delete a product (Admin only)
Orders
POST /orders: Place a new order
GET /orders: Retrieve all orders for a user
GET /orders/:id: Retrieve order details by ID
Payment Integration
This project uses Stripe for payment processing. Ensure your Stripe keys are correctly configured in both backend and frontend .env files.

Logging
Logs for authentication, product management, and order placement are stored in the logs/ directory on the backend.

Future Improvements
Add user reviews and ratings for products.
Implement email notifications for order status updates.
Add multi-language support for international users.