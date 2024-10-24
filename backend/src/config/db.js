// db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  });

const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.getConnection((err, conn) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the MySQL database.');
        conn.release();
    }
});

module.exports = connection;