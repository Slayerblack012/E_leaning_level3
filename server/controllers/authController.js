const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../models/db');

async function register(req, res) {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  const data = db.readData();
  const exists = data.users.find(u => u.username === username);
  if (exists) return res.status(409).json({ error: 'User exists' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      username,
      password: hash,
      role: role || 'student',
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

module.exports = {
  register,
  login
};
