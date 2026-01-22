const Petition = require("../models/Petition");
const Signature = require("../models/Signature");
const Vote = require("../models/Vote");


exports.generateReports = async (req, res) => {
  try {
    const officialLocation = req.user.location;

    if (!officialLocation) {
      return res.status(400).json({
        message: "Official location not found"
      });
    }

    const petitionsByStatus = await Petition.aggregate([
      {
        $match: {
          location: officialLocation
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const signaturesPerPetition = await Signature.aggregate([
      {
        $lookup: {
          from: "petitions",
          localField: "petition",
          foreignField: "_id",
          as: "petition"
        }
      },
      { $unwind: "$petition" },
      {
        $match: {
          "petition.location": officialLocation
        }
      },
      {
        $group: {
          _id: "$petition._id",
          title: { $first: "$petition.title" },
          totalSignatures: { $sum: 1 }
        }
      }
    ]);

    const pollVotesByPoll = await Vote.aggregate([
  {
    $match: {
      locationSnapshot: officialLocation
    }
  },
  {
    $group: {
      _id: "$poll",
      totalVotes: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "polls",
      localField: "_id",
      foreignField: "_id",
      as: "poll"
    }
  },
  { $unwind: "$poll" },
  {
    $project: {
      _id: 0,
      pollId: "$poll._id",
      title: "$poll.title",
      totalVotes: 1
    }
  }
]);

    res.status(200).json({
      petitionsByStatus,
      signaturesPerPetition,
      pollVotesByPoll
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate report",
      error: error.message
    });
  }
};

exports.generateReportsCSV = async (req, res) => {
  try {
    const officialLocation = req.user.location;

    if (!officialLocation) {
      return res.status(400).json({
        message: "Official location not found"
      });
    }

    const petitionsByStatus = await Petition.aggregate([
      { $match: { location: officialLocation } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    let csv = "Report Type,Key,Value\n";

    petitionsByStatus.forEach(item => {
      csv += `Petitions By Status,${item._id},${item.count}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=governance_report.csv"
    );

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      message: "Failed to export report",
      error: error.message
    });
  }
};
