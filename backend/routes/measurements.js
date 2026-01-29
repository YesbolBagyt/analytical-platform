const express = require("express");
const router = express.Router();
const Measurement = require("../models/Measurement");

router.get("/", async (req, res) => {
  try {
    const { field, start_date, end_date } = req.query;

    if (!field) {
      return res.status(400).json({ error: "Field is required" });
    }

    if (!["field1", "field2", "field3"].includes(field)) {
      return res.status(400).json({ error: "Invalid field name" });
    }

    const query = {};

    if (start_date && end_date) {
      query.timestamp = {
        $gte: new Date(start_date),
        $lte: new Date(end_date)
      };
    }

    const data = await Measurement.find(query)
      .select(`timestamp ${field}`)
      .sort({ timestamp: 1 });

    if (data.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/metrics", async (req, res) => {
  try {
    const { field } = req.query;

    if (!field) {
      return res.status(400).json({ error: "Field is required" });
    }

    if (!["field1", "field2", "field3"].includes(field)) {
      return res.status(400).json({ error: "Invalid field name" });
    }

    const result = await Measurement.aggregate([
      { $match: { [field]: { $ne: null } } },
      {
        $group: {
          _id: null,
          avg: { $avg: `$${field}` },
          min: { $min: `$${field}` },
          max: { $max: `$${field}` },
          stdDev: { $stdDevPop: `$${field}` }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: "No data available" });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
