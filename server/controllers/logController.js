const db = require('../models/db');

function logAction(req, res) {
  const { action, details } = req.body;
  if (!action) return res.status(400).json({ error: 'action required' });
  
  const data = db.readData();
  if (!data.logs) data.logs = [];
  
  data.logs.push({
    id: Date.now().toString() + Math.random().toString(),
    userId: req.user.id,
    username: req.user.username,
    action,
    details: details || '',
    timestamp: new Date().toISOString()
  });
  
  db.writeData(data);
  res.json({ ok: true });
}

module.exports = {
  logAction
};
