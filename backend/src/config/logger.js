const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

// Define custom log format
const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Create a Winston logger instance
const logger = createLogger({
    level: 'info', // Default log level
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), // Capture stack traces
        customFormat
    ),
    transports: [
        // Console transport for development
        new transports.Console({
            format: combine(
                format.colorize(),
                customFormat
            )
        }),
        // File transport for logs
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d' // Keep logs for 14 days
        }),
        // Separate error logs
        new DailyRotateFile({
            level: 'error',
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d' // Keep error logs for 30 days
        })
    ],
    exitOnError: false, // Do not exit on handled exceptions
});

// Stream for morgan (HTTP request logging)
logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};

module.exports = logger;
