// const redis = require('redis');
// const dotenv = require('dotenv');

// dotenv.config();

// const redisClient = redis.createClient({
//     url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
//     password: process.env.REDIS_PASSWORD || undefined
// });

// // Event listeners for Redis client
// redisClient.on('error', (err) => {
//     console.error('Redis Client Error', err);
// });

// redisClient.on('connect', () => {
//     console.log('Connected to Redis successfully.');
// });

// // // Connect to Redis
// // (async () => {
// //     await redisClient.connect();
// // })();

// // Attempt to connect
// redisClient.connect().catch((err) => {
//     console.error('Could not connect to Redis:', err);
// });

// module.exports = redisClient;
