const User = require('../models/User');

const allowRoles = (...roles) => {
  return async (req, res , next) => {
    try {
      
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      console.error('Role middleware error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
};

const isCitizen = allowRoles('citizen');
const isOfficial = allowRoles('official');

module.exports = { isCitizen, isOfficial };
