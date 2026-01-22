const Petition = require("../models/Petition");
const AdminLog = require("../models/AdminLog");


exports.getPetitionsForOfficial = async (req, res) => {
  try {
    const officialLocation = req.user.location;
    const { status } = req.query;

    if (!officialLocation) {
      return res.status(400).json({
        message: "Official location not found"
      });
    }

    const filter = {
      location: officialLocation
    };

    if (status) {
      filter.status = status;
    }

    const petitions = await Petition.find(filter)
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: petitions.length,
      petitions
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch petitions",
      error: error.message
    });
  }
};

exports.respondToPetition = async (req, res) => {
  try {
    const { id } = req.params;
    const { responseText, status } = req.body;

    if (!responseText) {
      return res.status(400).json({
        message: "Response text is required"
      });
    }

    const petition = await Petition.findById(id);

    if (!petition) {
      return res.status(404).json({
        message: "Petition not found"
      });
    }

    if (petition.location !== req.user.location) {
      return res.status(403).json({
        message: "You are not authorized to respond to this petition"
      });
    }

    petition.officialResponse = responseText;
    petition.respondedBy = req.user._id;
    petition.respondedAt = new Date();

    if (status) {
      petition.status = status;
    } else {
      petition.status = "under_review";
    }

    await petition.save();

    await AdminLog.create({
      action: "RESPONDED_TO_PETITION",
      user: req.user._id,
      petition: petition._id
    });

    res.status(200).json({
      message: "Petition response recorded successfully",
      petition
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to respond to petition",
      error: error.message
    });
  }
};

