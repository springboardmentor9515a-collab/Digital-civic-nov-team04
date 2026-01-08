const mongoose = require('mongoose');
const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

// @desc    Create a new poll
// @route   POST /api/polls
// @access  Official / Admin
exports.createPoll = async (req, res) => {
  try {
    const { title, description, options, targetLocation, expiresAt } = req.body;

    if (!title || !options || !targetLocation) {
      return res.status(400).json({
        message: 'Title, options, and target location are required',
      });
    }

    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        message: 'Poll must have at least two options',
      });
    }

    const cleanedOptions = [
      ...new Set(options.map((opt) => opt.trim())),
    ];

    if (cleanedOptions.length < 2) {
      return res.status(400).json({
        message: 'Poll options must be unique',
      });
    }

    const poll = await Poll.create({
      title,
      description,
      options: cleanedOptions,
      createdBy: req.user._id,
      targetLocation,
      expiresAt,
    });

    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create poll',
      error: error.message,
    });
  }
};
// @desc    Get polls by location
// @route   GET /api/polls
// @access  Authenticated
exports.getPolls = async (req, res) => {
  try {
    const userLocation = req.user.location;
    const userRole = req.user.role;

    if (!userLocation) {
      return res.status(400).json({
        message: 'User location not set',
      });
    }

    const filter = {
      targetLocation: userLocation,
    };

    // Citizens see only active polls
    if (userRole === 'citizen') {
      filter.isActive = true;
    }

    const polls = await Poll.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch polls',
      error: error.message,
    });
  }
};

// @desc    Get poll by ID with vote results
// @route   GET /api/polls/:id
// @access  Authenticated
exports.getPollById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid poll ID' });
    }

    const poll = await Poll.findById(id).select('-__v');

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    // Location enforcement
    if (poll.targetLocation !== req.user.location) {
      return res.status(403).json({ message: 'Access denied for this poll' });
    }

    // Aggregate votes
    const votes = await Vote.aggregate([
      { $match: { poll: poll._id } },
      {
        $group: {
          _id: '$selectedOption',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);

    const results = poll.options.map((option) => {
      const vote = votes.find((v) => v._id === option);
      const count = vote ? vote.count : 0;
      const percentage =
        totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);

      return {
        option,
        count,
        percentage,
      };
    });

    res.status(200).json({
      poll,
      totalVotes,
      results,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch poll',
      error: error.message,
    });
  }
};


// @desc    Vote on a poll
// @route   POST /api/polls/:id/vote
// @access  Citizen
exports.voteOnPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedOption } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid poll ID' });
    }

    if (!selectedOption) {
      return res.status(400).json({ message: 'Selected option is required' });
    }

    const poll = await Poll.findById(id);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (!poll.isActive) {
      return res.status(400).json({ message: 'Poll is closed' });
    }

    // Location enforcement
    if (poll.targetLocation !== req.user.location) {
      return res.status(403).json({ message: 'Access denied for this poll' });
    }

    // Validate option
    if (!poll.options.includes(selectedOption)) {
      return res.status(400).json({ message: 'Invalid poll option' });
    }

    // Create vote (DB unique index prevents duplicates)
    await Vote.create({
      poll: poll._id,
      user: req.user._id,
      selectedOption,
      locationSnapshot: req.user.location,
    });

    res.status(201).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    // Duplicate vote handling
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already voted on this poll',
      });
    }

    res.status(500).json({
      message: 'Failed to record vote',
      error: error.message,
    });
  }
};
