const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticate } = require('../middlewares/auth');

// Get schedule for a trainer
router.get('/trainer/:trainerId', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT ts.*, GROUP_CONCAT(u.full_name) as members
      FROM training_sessions ts
      LEFT JOIN session_members sm ON ts.id = sm.session_id
      LEFT JOIN members m ON sm.member_id = m.id
      LEFT JOIN users u ON m.user_id = u.id
      WHERE ts.trainer_id = ?
      GROUP BY ts.id
      ORDER BY ts.session_date, ts.start_time
    `, [req.params.trainerId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create session
router.post('/', authenticate, async (req, res) => {
  try {
    const { trainer_id, session_date, start_time, end_time } = req.body;
    
    // Check trainer max 8h/day
    const [existing] = await pool.execute(`
      SELECT SUM(TIMESTAMPDIFF(HOUR, start_time, end_time)) as total_hours
      FROM training_sessions
      WHERE trainer_id = ? AND session_date = ?
    `, [trainer_id, session_date]);
    
    if (existing[0].total_hours >= 8) {
      return res.status(400).json({ error: 'Trainer has reached 8h limit for this day' });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO training_sessions (trainer_id, session_date, start_time, end_time) VALUES (?, ?, ?, ?)',
      [trainer_id, session_date, start_time, end_time]
    );
    
    res.status(201).json({ message: 'Session created', sessionId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
