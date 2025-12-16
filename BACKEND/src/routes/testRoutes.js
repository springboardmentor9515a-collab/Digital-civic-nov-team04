const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { isCitizen, isOfficial } = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /api/test/citizen
router.get('/citizen', protect, isCitizen, (req, res) => {
  res.json({ message: 'Citizen-only route accessed successfully' });
});

// GET /api/test/official
router.get('/official', protect, isOfficial, (req, res) => {
  res.json({ message: 'Official-only route accessed successfully' });
});

module.exports = router;
