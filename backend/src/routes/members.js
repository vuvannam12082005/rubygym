const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticate, authorize } = require('../middlewares/auth');

// Get all members (admin only)
router.get('/', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT m.id, u.full_name, u.email, m.join_date, m.is_loyal,
             t_u.full_name as trainer_name
      FROM members m 
      JOIN users u ON m.user_id = u.id
      LEFT JOIN trainers t ON m.trainer_id = t.id
      LEFT JOIN users t_u ON t.user_id = t_u.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get member profile
router.get('/:id', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT m.*, u.full_name, u.email, u.phone
      FROM members m JOIN users u ON m.user_id = u.id
      WHERE m.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) return res.status(404).json({ error: 'Member not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
