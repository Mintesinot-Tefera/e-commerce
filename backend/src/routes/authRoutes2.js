// const express = require('express');
// const { registerValidator, loginValidator } = require('../validators/authValidator');
// const { validationResult } = require('express-validator');
// const router = express.Router();

// router.post('/register', registerValidator, (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   // Proceed with registration logic...
// });

// router.post('/login', loginValidator, (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   // Proceed with login logic...
// });

// module.exports = router;
