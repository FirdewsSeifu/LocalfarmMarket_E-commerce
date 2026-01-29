// src/middleware/cacheMiddleware.js
import redisClient from '../config/redis';

const cache = (key) => async (req, res, next) => {
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error('Redis error:', err);
      return next();
    }
    if (data !== null) {
      return res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};

module.exports = cache;
