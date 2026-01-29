// src/utils/tokenUtils.js
import jwt from 'jsonwebtoken';
import config from '../config/env';

exports.signToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};
