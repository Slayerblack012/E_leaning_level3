const express = require('express');
const gradeController = require('../controllers/gradeController');
const rateLimit = require('../middlewares/rateLimit');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Both endpoints require authentication to prevent abuse and anonymous API usage
router.post(
  '/essays/grade',
  authMiddleware,
  rateLimit({ scope: 'grade-essay', windowMs: 15 * 60 * 1000, max: 30 }),
  gradeController.gradeEssay
);

router.post(
  '/chat',
  authMiddleware,
  rateLimit({ scope: 'grade-chat', windowMs: 15 * 60 * 1000, max: 30 }),
  gradeController.chatProxy
);

module.exports = router;
