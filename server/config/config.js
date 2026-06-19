const path = require('path');

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
  REDIS_URL: process.env.REDIS_URL || '',
  DATA_FILE: process.env.DATA_FILE || path.join(__dirname, '..', 'data.json')
};
