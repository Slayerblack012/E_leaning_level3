const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../models/db');

async function register(req, res) {
  const { username, password } = req.body;
  const cleanUsername = typeof username === 'string' ? username.trim() : '';
  const cleanPassword = typeof password === 'string' ? password : '';

  if (!cleanUsername || !cleanPassword) {
    return res.status(400).json({ error: 'username and password required' });
  }

  if (cleanUsername.length > 64 || cleanPassword.length < 8) {
    return res.status(400).json({ error: 'Invalid username or password policy' });
  }

  const data = db.readData();
  const exists = data.users.find(u => u.username === cleanUsername);
  if (exists) return res.status(409).json({ error: 'User exists' });

  try {
    const hash = await bcrypt.hash(cleanPassword, 10);
    const user = {
      id: Date.now().toString(),
      username: cleanUsername,
      password: hash,
      role: 'student',
      createdAt: new Date().toISOString()
    };
    data.users.push(user);
    
    // Log registration
    if (!data.logs) data.logs = [];
    data.logs.push({
      id: Date.now().toString() + Math.random().toString(),
      userId: user.id,
      username: user.username,
      action: 'REGISTER',
      details: 'Đăng ký tài khoản thành công',
      timestamp: new Date().toISOString()
    });
    
    db.writeData(data);
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: 'Registration failed', details: e.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const data = db.readData();
  const user = data.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: 'Login failed', details: e.message });
  }
}

async function getSync(req, res) {
  const data = db.readData();
  const user = data.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ syncData: user.syncData || {} });
}

async function postSync(req, res) {
  const { syncData } = req.body;
  const data = db.readData();
  const userIndex = data.users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  
  data.users[userIndex].syncData = {
    ...(data.users[userIndex].syncData || {}),
    ...syncData
  };
  
  db.writeData(data);
  res.json({ success: true, syncData: data.users[userIndex].syncData });
}

module.exports = {
  register,
  login,
  getSync,
  postSync
};
