const express = require('express');
const logController = require('../controllers/logController');
const authMiddleware = require('../middlewares/auth');
const rateLimit = require('../middlewares/rateLimit');

const router = express.Router();

router.post('/', authMiddleware, rateLimit({ scope: 'log-action', windowMs: 15 * 60 * 1000, max: 120 }), logController.logAction);

module.exports = router;
