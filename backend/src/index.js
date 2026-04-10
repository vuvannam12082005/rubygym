const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const trainerRoutes = require('./routes/trainers');
const memberRoutes = require('./routes/members');
const scheduleRoutes = require('./routes/schedule');
const subscriptionRoutes = require('./routes/subscriptions');
const evaluationRoutes = require('./routes/evaluations');
const eventRoutes = require('./routes/events');

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
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/events', eventRoutes);

module.exports = app;
