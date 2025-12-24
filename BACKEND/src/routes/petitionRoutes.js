const express = require("express");
const router = express.Router();

const {
  createPetition,
  getPetitions,
  getPetitionById,
} = require("../controllers/petitionController");

const { protect, protectOptional } = require("../middleware/authMiddleware");
const { isCitizen } = require("../middleware/roleMiddleware");

// Create petition (citizen only)
router.post("/", protect, isCitizen, createPetition);

// Get all petitions (public, role-aware)
router.get("/", protectOptional, getPetitions);
// Get petition by ID
router.get("/:id", protectOptional, getPetitionById);


module.exports = router;
