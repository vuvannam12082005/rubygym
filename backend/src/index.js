const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const trainerRoutes = require('./routes/trainers');
const memberRoutes = require('./routes/members');
const scheduleRoutes = require('./routes/schedule');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'rubygym-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/schedule', scheduleRoutes);

module.exports = app;
