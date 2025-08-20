const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  site: { type: String, required: true },
  timeSpent: { type: Number, required: true }, // in milliseconds
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Track", TrackSchema);
