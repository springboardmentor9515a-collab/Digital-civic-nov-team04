const Petition = require("../models/Petition");

/**
 * @desc Create a new petition
 * @route POST /api/petitions
 * @access Citizen only
 */
exports.createPetition = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // Basic validation
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const petition = await Petition.create({
      title,
      description,
      category,
      location,
      creator: req.user.id,
      status: "under_review",
    });

    res.status(201).json(petition);
  } catch (error) {
    console.error("Create petition error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
