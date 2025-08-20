const express = require("express");
const router = express.Router();
const Track = require("../models/Track");

// POST tracking data
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    for (let site in data) {
      await Track.create({ site, timeSpent: data[site] });
    }
    res.json({ message: "Data saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET daily report
router.get("/report", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const report = await Track.find({ date: { $gte: today } });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
