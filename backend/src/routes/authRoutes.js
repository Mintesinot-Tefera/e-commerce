const express = require('express');
const router = express.Router();
const { validateRegister, validateLogin } = require('../validators/authValidator');
// const { validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', validateRegister, authController.register);

// Login user
router.post('/login', validateLogin, authController.login);

module.exports = router;



