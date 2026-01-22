const mongoose = require("mongoose");

const petitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "under_review", "closed"],
      default: "under_review",
      index: true,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    officialResponse: {
  type: String,
  default: null
},

respondedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
},

respondedAt: {
  type: Date,
  default: null
},

status: {
  type: String,
  enum: ["active", "under_review", "closed"],
  default: "active"
}

  },
  {
    timestamps: true,
  }
);

petitionSchema.index({ location: 1, category: 1, status: 1 });

module.exports = mongoose.model("Petition", petitionSchema);
