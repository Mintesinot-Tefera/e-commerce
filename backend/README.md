# ecommerce-backend


## Description
This project provides a Node.js API for user authentication, product management, and order placement. It uses MySQL for the database and Redis for caching. Features include JWT authentication, role-based access control, and product stock management.

## Features
User Registration & Login with JWT  
Role-based access control (Admin and User)  
CRUD operations for products (Admin)  
Order placement and management (User)  
Caching with Redis  
Logging and Monitoring with Winston

## Prerequisites
Ensure you have the following installed:

Node.js (v14.x or higher)  
MySQL  
Redis  
Git (for cloning the repository)  
## Setup Instructions
### Step 1: Clone the repository
git clone https://gitlab.com/Mintesinot-Tefera/ecommerce-backend.git  
cd ecommerce-backend
### Step 2: Install dependencies
npm install
### Step 3: Set up environment variables
Create a .env file in the root directory with the following content:

PORT=5000  
JWT_SECRET=your_jwt_secret  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=  
DB_NAME=ecommerce

REDIS_HOST=localhost  
REDIS_PORT=6379
### Step 4: Set up the MySQL database
Start your MySQL server.  
Create a new database:  
CREATE DATABASE ecommerce;  
Run database migrations (you can use a migration tool like sequelize-cli or run SQL scripts manually).  
If you’re using manual SQL scripts:

Create tables for user, products, orders, and order_items.    

    CREATE TABLE IF NOT EXISTS user (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    username VARCHAR(50) NOT NULL,  
    email VARCHAR(50) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    role ENUM('user', 'admin') DEFAULT 'user',  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );  
  
  
     CREATE TABLE IF NOT EXISTS products (  
      id INT AUTO_INCREMENT PRIMARY KEY,  
      name VARCHAR(255) NOT NULL,  
      description TEXT,  
      price DECIMAL(10,2) DEFAULT 0 NOT NULL,  
      stock INT DEFAULT 0 NOT NULL,  
      category VARCHAR(255),
     );    
     
     CREATE TABLE IF NOT EXISTS orders (  
         order_id INT AUTO_INCREMENT PRIMARY KEY,  
         user_id INT NOT NULL,  
         products TEXT NOT NULL,  
         total_price DECIMAL(10,2) NOT NULL,  
         status ENUM('pending', 'completed', 'shipped', 'cancelled') DEFAULT 'pending',  
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );  

     CREATE TABLE IF NOT EXISTS order_items (  
      id INT AUTO_INCREMENT PRIMARY KEY,  
      order_id INT NOT NULL,  
      product_id INT NOT NULL,  
      quantity INT NOT NULL,  
      price DECIMAL(10,2) NOT NULL,  
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,  
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );
  
### Step 5: Start Redis
Make sure Redis is installed and running.

### Step 6: Run the application
npm start  
Your API should now be running at http://localhost:5000.

### Step 7: Running Database Migrations
If you're using a migration tool like Sequelize or Knex, run the following command to migrate the database:

npx sequelize-cli  
db:migrate
### Step 8: Running Unit Tests
To run tests (using Jest):

npm test
## API Endpoints
### Auth  
POST **/auth/register**: Register a new user  
POST **/auth/login**: Login a user and return a JWT token
### Products
POST **/products**: Add a new product (Admin)  
GET **/products**: Get all products (Public)  
GET **/products/:id** : Get product by ID (Public)  
PUT **/products/:id** : Update a product (Admin)  
DELETE **/products/:id** : Delete a product (Admin)
### Orders
POST **/orders**: Place an order (User)  
GET **/orders**: Get user orders (User)  
GET **/orders/:id** : Get order by ID (User)
## Logging & Monitoring
Logs are stored in the logs/ directory and include registration, login, product CRUD, and order placement logs.