const path = require('path');

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
  DATA_FILE: path.join(__dirname, '..', 'data.json')
};
