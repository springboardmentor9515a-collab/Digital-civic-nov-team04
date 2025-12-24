const express = require("express");
const router = express.Router();

const { createPetition } = require("../controllers/petitionController");
const { protect } = require("../middleware/authMiddleware");
const { isCitizen } = require("../middleware/roleMiddleware");

// Create petition (citizen only)
router.post("/", protect, isCitizen, createPetition);

module.exports = router;
