const express = require('express');
const authRoutes = require('./authRoutes');
const logRoutes = require('./logRoutes');
const contentRoutes = require('./contentRoutes');
const gradeRoutes = require('./gradeRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/logs', logRoutes);
router.use('/', contentRoutes);
router.use('/', gradeRoutes);

module.exports = router;
