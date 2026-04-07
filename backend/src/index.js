const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const trainerRoutes = require('./routes/trainers');
const memberRoutes = require('./routes/members');
const scheduleRoutes = require('./routes/schedule');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'rubygym-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/schedule', scheduleRoutes);

// Don't start server when running tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`RubyGYM API running on port ${PORT}`);
  });
}

module.exports = app;
