const db = require('../models/db');

function getSubjects(req, res) {
  const data = db.readData();
  res.json({ subjects: data.subjects || [] });
}

function getQuizzes(req, res) {
  const data = db.readData();
  const subject = req.params.subject;
  res.json({ quizzes: data.quizzes?.[subject] || [] });
}

function getEssays(req, res) {
  const data = db.readData();
  const subject = req.params.subject;
  res.json({ essays: data.essays?.[subject] || [] });
}

function addSubject(req, res) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const data = db.readData();
  const subject = req.body;
  if (!subject || typeof subject !== 'object' || Array.isArray(subject)) {
    return res.status(400).json({ error: 'Invalid subject payload' });
  }

  subject.id = subject.id || (subject.title || 'subject').toLowerCase().replace(/[^a-z0-9_]/g, '_');
  
  if (!data.subjects) data.subjects = [];
  data.subjects.push(subject);
  if (!db.writeData(data)) {
    return res.status(500).json({ error: 'Không thể lưu môn học' });
  }

  res.json({ ok: true, subject });
}

module.exports = {
  getSubjects,
  getQuizzes,
  getEssays,
  addSubject
};
