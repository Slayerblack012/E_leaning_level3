const express = require('express');
const gradeController = require('../controllers/gradeController');
const rateLimit = require('../middlewares/rateLimit');

const router = express.Router();

router.post('/essays/grade', rateLimit({ scope: 'grade-essay', windowMs: 15 * 60 * 1000, max: 30 }), gradeController.gradeEssay);
router.post('/chat', rateLimit({ scope: 'grade-chat', windowMs: 15 * 60 * 1000, max: 30 }), gradeController.chatProxy);

module.exports = router;
