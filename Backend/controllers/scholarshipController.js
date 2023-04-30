const express = require("express");
var router = express.Router();

var { scholarship } = require("../models/scholarship");

router.get("/", async (req, res) => {
  try {
    const docs = await scholarship.find();
    res.send(docs);
  } catch (err) {
    console.error("Error in retrieving scholarships:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const scholarshipId = req.params.id;
    const scholarshipDoc = await scholarship.findById(scholarshipId);
    if (!scholarshipDoc) {
      res.status(404).send("Scholarship not found");
      return;
    }
    res.send(scholarshipDoc);
  } catch (err) {
    console.error("Error in retrieving scholarship by ID:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
