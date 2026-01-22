const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Controllers (to be implemented later)
const {
  getPetitionsForOfficial,
  respondToPetition
} = require("../controllers/governanceController");

// All governance routes require auth + official role
router.use(protect);
router.use(authorizeRoles("official"));

// GET petitions assigned to official (by location)
router.get("/petitions", getPetitionsForOfficial);

// POST response to a petition
router.post("/petitions/:id/respond", respondToPetition);

module.exports = router;
