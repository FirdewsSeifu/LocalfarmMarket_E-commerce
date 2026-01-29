// src/utils/logger.js
const log = (message, type = 'info') => {
    const timestamp = new Date().toISOString();
    const types = {
      info: '\x1b[36m%s\x1b[0m',
      success: '\x1b[32m%s\x1b[0m',
      warn: '\x1b[33m%s\x1b[0m',
      error: '\x1b[31m%s\x1b[0m',
    };
    const color = types[type] || types.info;
    console.log(color, `[${timestamp}] ${message}`);
  };
  
  module.exports = log;
  