// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');
// const dotenv = require('dotenv');
// const logger = require('../config/logger');

// dotenv.config();

// const register = (req, res) => {
//     const { username, email, password } = req.body;

//     // Validate input
//     if (!username || !email || !password) {
//         logger.warn(`User registration validation failed: ${JSON.stringify(errors.array())}`);
//         return res.status(400).json({ message: 'Please provide username, email, and password.' });
//     }

//     // Check if user already exists
//     const checkUserQuery = 'SELECT * FROM user WHERE email = ?';
//     db.query(checkUserQuery, [email], async (err, results) => {
//         if (err) {
//             console.error('Error checking user existence:', err);
//             return res.status(500).json({ message: 'Server error.' });
//         }

//         if (results.length > 0) {
//             logger.warn(`User registration attempted with existing email: ${email}`);
//             return res.status(400).json({ message: 'User already exists with this email.' });
//         }

//         // Hash the password
//         const saltRounds = 10;
//         try {
//             const hashedPassword = await bcrypt.hash(password, saltRounds);

//             // Insert new user
//             const insertUserQuery = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
//             db.query(insertUserQuery, [username, email, hashedPassword], (err, result) => {
//                 if (err) {
//                     console.error('Error inserting user:', err);
//                     return res.status(500).json({ message: 'Server error.' });
//                 }
//                 logger.info(`New user registered: ${email} (ID: ${result.insertId})`);
//                 return res.status(201).json({ message: 'User registered successfully.' });
//             });
//         } catch (hashError) {
//             console.error('Error hashing password:', hashError);
//             logger.error(`Error during user registration for email ${email}: ${error.stack}`);
//             return res.status(500).json({ message: 'Server error.' });
//         }
//     });
// };

// const login = (req, res) => {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//         logger.warn(`User login validation failed: ${JSON.stringify(errors.array())}`);
//         return res.status(400).json({ message: 'Please provide email and password.' });
//     }

//     // Check if user exists
//     const getUserQuery = 'SELECT * FROM user WHERE email = ?';
//     db.query(getUserQuery, [email], async (err, results) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).json({ message: 'Server error.' });
//         }

//         if (results.length === 0) {
//             logger.warn(`Login attempt with non-existent email: ${email}`);
//             return res.status(400).json({ message: 'Invalid email or password.' });
//         }

//         const user = results[0];

//         // Compare passwords
//         try {
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (!isMatch) {
//                 logger.warn(`Invalid password attempt for email: ${email}`);
//                 return res.status(400).json({ message: 'Invalid email or password.' });
//             }

//             // Generate JWT
//             const payload = {
//                 id: user.id,
//                 username: user.username,
//                 email: user.email,
//                 role: user.role
//             };

//             const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

//             logger.info(`User logged in: ${email} (ID: ${user.id})`);

//             return res.status(200).json({ token });
//         } catch (compareError) {
//             console.error('Error comparing passwords:', compareError);
//             logger.error(`Error during user login for email ${email}: ${error.stack}`);
//             return res.status(500).json({ message: 'Server error.' });
//         }
//     });
// };

// module.exports = {
//     register,
//     login
// };
