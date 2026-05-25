const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  label: {
    type: String,
  },

  description: {
    type: String,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  videoUrl: {
    type: String,
  },

  duration: {
    type: Number,
  },

  steps: [
    {
      type: String,
    },
  ],

  benefits: [
    {
      type: String,
    },
  ],

  precautions: [
    {
      type: String,
    },
  ],
});

module.exports =
    mongoose.model("Yoga", yogaSchema,"yoga_list");