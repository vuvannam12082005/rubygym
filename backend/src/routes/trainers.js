const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticate, authorize } = require('../middlewares/auth');

// Get all trainers
router.get('/', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT t.id, u.full_name, u.email, u.phone, t.specialization
      FROM trainers t JOIN users u ON t.user_id = u.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get trainer's clients
router.get('/:id/clients', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT m.id, u.full_name, u.email, u.phone
      FROM members m JOIN users u ON m.user_id = u.id
      WHERE m.trainer_id = ?
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
