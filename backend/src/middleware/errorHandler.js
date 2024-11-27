const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    logger.error(`Unhandled Error: ${err.stack}`);
    res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = errorHandler;
