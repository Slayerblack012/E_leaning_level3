const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
  // Support token via Authorization header or query string (needed for EventSource/SSE)
  let token = null;

  const auth = req.headers.authorization;
  if (auth) {
    const parts = auth.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      token = parts[1];
    }
  }

  // Fallback: token passed as query param for SSE connections (EventSource cannot set headers)
  if (!token && req.query && typeof req.query.token === 'string') {
    token = req.query.token;
  }

  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
