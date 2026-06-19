const fs = require('fs');
const config = require('../config/config');

const DEFAULT_DATA = {
  users: [],
  subjects: [],
  quizzes: {},
  essays: {},
  logs: []
};

function normalizeData(data) {
  const safeData = data && typeof data === 'object' ? data : {};
  return {
    ...DEFAULT_DATA,
    ...safeData,
    users: Array.isArray(safeData.users) ? safeData.users : [],
    subjects: Array.isArray(safeData.subjects) ? safeData.subjects : [],
    quizzes: safeData.quizzes && typeof safeData.quizzes === 'object' ? safeData.quizzes : {},
    essays: safeData.essays && typeof safeData.essays === 'object' ? safeData.essays : {},
    logs: Array.isArray(safeData.logs) ? safeData.logs : []
  };
}

function readData() {
  if (!fs.existsSync(config.DATA_FILE)) {
    return normalizeData();
  }
  try {
    return normalizeData(JSON.parse(fs.readFileSync(config.DATA_FILE, 'utf-8')));
  } catch (e) {
    console.error('Database parse error, returning fallback schema:', e);
    return normalizeData();
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(config.DATA_FILE, JSON.stringify(normalizeData(data), null, 2));
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
