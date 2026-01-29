// src/utils/passwordUtils.js
import bcrypt from 'bcryptjs';

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.comparePasswords = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
