const Petition = require("../models/Petition");

// CREATE
const createPetition = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const petition = await Petition.create({
      title,
      description,
      category,
      location: location.toLowerCase().trim(),
      creator: req.user._id,
      status: "under_review",
    });

    res.status(201).json(petition);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL
const getPetitions = async (req, res) => {
  try {
    const filters = {};

    if (req.query.category) filters.category = req.query.category;
    if (req.query.status) filters.status = req.query.status;

    if (req.user?.role === "official") {
      filters.location = req.user.location.toLowerCase().trim();
    } else if (req.query.location) {
      filters.location = req.query.location.toLowerCase().trim();
    }

    const petitions = await Petition.find(filters)
      .populate("creator", "name role location")
      .sort({ createdAt: -1 });

    res.json(petitions);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
// GET BY ID
const getPetitionById = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id)
      .populate("creator", "name role location");

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    // If official is logged in, enforce location restriction
    if (
      req.user &&
      req.user.role === "official" &&
      petition.location.toLowerCase().trim() !==
        req.user.location.toLowerCase().trim()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(petition);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createPetition, getPetitions, getPetitionById };

