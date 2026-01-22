const mongoose = require("mongoose");

const adminLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    petition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Petition",
      default: null
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("AdminLog", adminLogSchema);
