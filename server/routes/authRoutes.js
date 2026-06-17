const express = require('express');
const authController = require('../controllers/authController');
const rateLimit = require('../middlewares/rateLimit');

const router = express.Router();

router.post('/register', rateLimit({ scope: 'auth-register', windowMs: 15 * 60 * 1000, max: 10 }), authController.register);
router.post('/login', rateLimit({ scope: 'auth-login', windowMs: 15 * 60 * 1000, max: 10 }), authController.login);

module.exports = router;
