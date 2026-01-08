const express = require('express');
const router = express.Router();

const rateLimit = require('express-rate-limit');

const voteLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // max 5 votes attempts
  message: { message: 'Too many voting attempts. Try again later.' },
});


const {
  createPoll,
  getPolls,
  getPollById,
  voteOnPoll,
} = require('../controllers/pollController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post(
  '/',
  protect,
  authorizeRoles('official', 'admin'),
  createPoll
);

router.get(
  '/',
  protect,
  getPolls
);

router.get(
  '/:id',
  protect,
  getPollById
);

router.post(
  '/:id/vote',
  protect,
  authorizeRoles('citizen'),
  voteLimiter,
  voteOnPoll
);

module.exports = router;
