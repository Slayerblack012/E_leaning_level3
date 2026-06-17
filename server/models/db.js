const fs = require('fs');
const config = require('../config/config');

function readData() {
  if (!fs.existsSync(config.DATA_FILE)) {
    return { users: [], subjects: [], quizzes: {}, essays: {}, logs: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(config.DATA_FILE, 'utf-8'));
  } catch (e) {
    console.error('Database parse error, returning fallback schema:', e);
    return { users: [], subjects: [], quizzes: {}, essays: {}, logs: [] };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(config.DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error('Database write error:', e);
    return false;
  }
}

module.exports = {
  readData,
  writeData
};
