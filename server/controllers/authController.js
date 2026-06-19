const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../models/db');

// In-memory subscribers map for SSE: { userId: Set(res) }
const subscribers = new Map();

function notifyUserSubscribers(userId, payload) {
  const set = subscribers.get(userId);
  if (!set) return;
  const data = `event: sync\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const res of set) {
    try {
      res.write(data);
    } catch (e) {
      // Ignore write errors; cleanup will happen on 'close'.
    }
  }
}

function createAuthResponse(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: { id: user.id, username: user.username, role: user.role }
  };
}

async function register(req, res) {
  const { username, password } = req.body || {};
  const cleanUsername = typeof username === 'string' ? username.trim() : '';
  const cleanPassword = typeof password === 'string' ? password : '';

  if (!cleanUsername || !cleanPassword) {
    return res.status(400).json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
  }

  if (cleanUsername.length > 64 || cleanPassword.length < 8) {
    return res.status(400).json({ error: 'Tên đăng nhập tối đa 64 ký tự, mật khẩu tối thiểu 8 ký tự' });
  }

  const data = db.readData();
  const exists = data.users.find((u) => u.username === cleanUsername);
  if (exists) return res.status(409).json({ error: 'Tên đăng nhập đã tồn tại' });

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
    data.logs.push({
      id: Date.now().toString() + Math.random().toString(),
      userId: user.id,
      username: user.username,
      action: 'REGISTER',
      details: 'Đăng ký tài khoản thành công',
      timestamp: new Date().toISOString()
    });

    if (!db.writeData(data)) {
      return res.status(500).json({ error: 'Không thể lưu dữ liệu người dùng' });
    }

    res.json(createAuthResponse(user));
  } catch (e) {
    res.status(500).json({ error: 'Đăng ký thất bại', details: e.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body || {};
  const cleanUsername = typeof username === 'string' ? username.trim() : '';
  const cleanPassword = typeof password === 'string' ? password : '';

  if (!cleanUsername || !cleanPassword) {
    return res.status(400).json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
  }

  const data = db.readData();
  const user = data.users.find((u) => u.username === cleanUsername);
  if (!user) return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });

  try {
    const match = await bcrypt.compare(cleanPassword, user.password);
    if (!match) return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });

    res.json(createAuthResponse(user));
  } catch (e) {
    res.status(500).json({ error: 'Đăng nhập thất bại', details: e.message });
  }
}

async function getSync(req, res) {
  const data = db.readData();
  const user = data.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ syncData: user.syncData || {} });
}

// SSE stream for realtime sync updates.
function streamSync(req, res) {
  // Note: SSE relies on long-lived connections. On serverless platforms this
  // may be limited, so the client keeps polling as a fallback.
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const userId = req.user.id;
  if (!subscribers.has(userId)) subscribers.set(userId, new Set());
  const set = subscribers.get(userId);
  set.add(res);

  const user = db.readData().users.find((u) => u.id === userId);
  const data = JSON.stringify({ syncData: user?.syncData || {} });
  res.write(`event: sync\ndata: ${data}\n\n`);

  req.on('close', () => {
    set.delete(res);
    if (set.size === 0) subscribers.delete(userId);
  });
}

async function postSync(req, res) {
  const { syncData } = req.body || {};
  if (!syncData || typeof syncData !== 'object' || Array.isArray(syncData)) {
    return res.status(400).json({ error: 'syncData must be an object' });
  }

  const data = db.readData();
  const userIndex = data.users.findIndex((u) => u.id === req.user.id);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  data.users[userIndex].syncData = {
    ...(data.users[userIndex].syncData || {}),
    ...syncData
  };

  if (!db.writeData(data)) {
    return res.status(500).json({ error: 'Không thể lưu dữ liệu đồng bộ' });
  }

  notifyUserSubscribers(data.users[userIndex].id, { syncData: data.users[userIndex].syncData });
  res.json({ success: true, syncData: data.users[userIndex].syncData });
}

module.exports = {
  register,
  login,
  getSync,
  postSync,
  streamSync
};
