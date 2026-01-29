// src/services/authService.js
import jwt from 'jsonwebtoken';
import config from '../config/env';
import bcrypt from 'bcryptjs';

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.comparePasswords = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
    expiresIn: '7d',
  });
};
