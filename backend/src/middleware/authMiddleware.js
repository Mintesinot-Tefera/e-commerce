const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification failed:', err);
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: 'Authorization token not provided.' });
    }
};

module.exports = authenticateJWT;
