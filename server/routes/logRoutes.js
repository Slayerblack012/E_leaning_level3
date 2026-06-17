const express = require('express');
const logController = require('../controllers/logController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, logController.logAction);

module.exports = router;
