// src/services/cacheService.js
import redisClient from '../config/redis';

exports.setCache = (key, data, ttl = 3600) => {
  redisClient.setex(key, ttl, JSON.stringify(data), (err) => {
    if (err) console.error('Redis setCache error:', err);
  });
};

exports.getCache = (key, callback) => {
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error('Redis getCache error:', err);
      return callback(err, null);
    }
    callback(null, data ? JSON.parse(data) : null);
  });
};

exports.clearCache = (key) => {
  redisClient.del(key, (err) => {
    if (err) console.error('Redis clearCache error:', err);
  });
};
