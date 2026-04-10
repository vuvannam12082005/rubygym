const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticate } = require('../middlewares/auth');

const getTrainerIdByUser = async (userId) => {
  const [rows] = await pool.execute('SELECT id FROM trainers WHERE user_id = ?', [userId]);
  return rows.length > 0 ? rows[0].id : null;
};

const getMemberIdByUser = async (userId) => {
  const [rows] = await pool.execute('SELECT id FROM members WHERE user_id = ?', [userId]);
  return rows.length > 0 ? rows[0].id : null;
};

const canAccessEvaluation = async (req, evaluationId) => {
  if (req.user.role === 'ADMIN') {
    return true;
  }

  const [rows] = await pool.execute('SELECT member_id, trainer_id FROM monthly_evaluations WHERE id = ?', [evaluationId]);
  if (rows.length === 0) {
    return false;
  }

  if (req.user.role === 'TRAINER') {
    const trainerId = await getTrainerIdByUser(req.user.id);
    return Number(trainerId) === Number(rows[0].trainer_id);
  }

  if (req.user.role === 'MEMBER') {
    const memberId = await getMemberIdByUser(req.user.id);
    return Number(memberId) === Number(rows[0].member_id);
  }

  return false;
};

const validateTrainerOwnClient = async (trainerId, memberId) => {
  const [rows] = await pool.execute(
    'SELECT id FROM members WHERE id = ? AND trainer_id = ?',
    [memberId, trainerId]
  );
  return rows.length > 0;
};

// Get evaluations
router.get('/', authenticate, async (req, res) => {
  try {
    let query = `
      SELECT me.*, m_u.full_name as member_name, t_u.full_name as trainer_name
      FROM monthly_evaluations me
      JOIN members m ON me.member_id = m.id
      JOIN users m_u ON m.user_id = m_u.id
      JOIN trainers t ON me.trainer_id = t.id
      JOIN users t_u ON t.user_id = t_u.id
    `;
    const params = [];

    if (req.user.role === 'TRAINER') {
      const trainerId = await getTrainerIdByUser(req.user.id);
      query += ' WHERE me.trainer_id = ?';
      params.push(trainerId);
    } else if (req.user.role === 'MEMBER') {
      const memberId = await getMemberIdByUser(req.user.id);
      query += ' WHERE me.member_id = ?';
      params.push(memberId);
    }

    query += ' ORDER BY me.month_year DESC, me.created_at DESC';
    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get evaluation detail
router.get('/:id', authenticate, async (req, res) => {
  try {
    const allowed = await canAccessEvaluation(req, req.params.id);
    if (!allowed) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const [rows] = await pool.execute(`
      SELECT me.*, m_u.full_name as member_name, t_u.full_name as trainer_name
      FROM monthly_evaluations me
      JOIN members m ON me.member_id = m.id
      JOIN users m_u ON m.user_id = m_u.id
      JOIN trainers t ON me.trainer_id = t.id
      JOIN users t_u ON t.user_id = t_u.id
      WHERE me.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create evaluation
router.post('/', authenticate, async (req, res) => {
  try {
    if (!['ADMIN', 'TRAINER'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const {
      member_id,
      trainer_id,
      month_year,
      target_weight,
      actual_weight,
      target_bmi,
      actual_bmi,
      notes
    } = req.body;

    let finalTrainerId = trainer_id;
    if (req.user.role === 'TRAINER') {
      finalTrainerId = await getTrainerIdByUser(req.user.id);
    }

    const validOwner = await validateTrainerOwnClient(finalTrainerId, member_id);
    if (!validOwner) {
      return res.status(400).json({ error: 'Trainer can only evaluate their own clients' });
    }

    const [result] = await pool.execute(
      `INSERT INTO monthly_evaluations
       (member_id, trainer_id, month_year, target_weight, actual_weight, target_bmi, actual_bmi, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [member_id, finalTrainerId, month_year, target_weight, actual_weight, target_bmi, actual_bmi, notes || null]
    );

    res.status(201).json({ message: 'Evaluation created', evaluationId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update evaluation
router.put('/:id', authenticate, async (req, res) => {
  try {
    const allowed = await canAccessEvaluation(req, req.params.id);
    if (!allowed) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const [rows] = await pool.execute('SELECT * FROM monthly_evaluations WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    const existing = rows[0];
    let trainerId = req.body.trainer_id || existing.trainer_id;

    if (req.user.role === 'TRAINER') {
      trainerId = await getTrainerIdByUser(req.user.id);
    }

    const memberId = req.body.member_id || existing.member_id;
    const validOwner = await validateTrainerOwnClient(trainerId, memberId);
    if (!validOwner) {
      return res.status(400).json({ error: 'Trainer can only evaluate their own clients' });
    }

    await pool.execute(
      `UPDATE monthly_evaluations
       SET member_id = ?, trainer_id = ?, month_year = ?, target_weight = ?, actual_weight = ?,
           target_bmi = ?, actual_bmi = ?, notes = ?
       WHERE id = ?`,
      [
        memberId,
        trainerId,
        req.body.month_year || existing.month_year,
        req.body.target_weight !== undefined ? req.body.target_weight : existing.target_weight,
        req.body.actual_weight !== undefined ? req.body.actual_weight : existing.actual_weight,
        req.body.target_bmi !== undefined ? req.body.target_bmi : existing.target_bmi,
        req.body.actual_bmi !== undefined ? req.body.actual_bmi : existing.actual_bmi,
        req.body.notes !== undefined ? req.body.notes : existing.notes,
        req.params.id
      ]
    );

    res.json({ message: 'Evaluation updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete evaluation
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const allowed = await canAccessEvaluation(req, req.params.id);
    if (!allowed || req.user.role === 'MEMBER') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const [rows] = await pool.execute('SELECT id FROM monthly_evaluations WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    await pool.execute('DELETE FROM monthly_evaluations WHERE id = ?', [req.params.id]);
    res.json({ message: 'Evaluation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
