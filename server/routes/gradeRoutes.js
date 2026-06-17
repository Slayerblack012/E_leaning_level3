const express = require('express');
const gradeController = require('../controllers/gradeController');

const router = express.Router();

router.post('/essays/grade', gradeController.gradeEssay);
router.post('/chat', gradeController.chatProxy);

module.exports = router;
