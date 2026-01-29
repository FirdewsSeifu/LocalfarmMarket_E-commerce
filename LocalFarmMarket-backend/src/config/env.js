// src/config/env.js
const config = {
  port: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  redisUrl: process.env.REDIS_URL,
};

module.exports = config;

