const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const apiRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));

// Mount all MVC routes under /api
app.use('/api', apiRoutes);

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(config.PORT, () => console.log(`E-Learning server running on port ${config.PORT}`));
}

module.exports = app;
