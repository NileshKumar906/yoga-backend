const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },
    
      fcmToken: {
    type: String,
    default: null,
  },

    streak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    completedDates: {
      type: [String],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);