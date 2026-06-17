const express = require('express');
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/subjects', contentController.getSubjects);
router.get('/quizzes/:subject', contentController.getQuizzes);
router.get('/essays/:subject', contentController.getEssays);
router.post('/admin/subjects', authMiddleware, contentController.addSubject);

module.exports = router;
