const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  uploadedBy: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Media", mediaSchema);
