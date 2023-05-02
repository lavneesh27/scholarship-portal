const express = require("express");
var router = express.Router();

var { user } = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const docs = await user.find();
    res.send(docs);
  } catch (err) {
    console.error("Error in retrieving users:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userDoc = await user.findById(userId);
    if (!userDoc) {
      res.status(404).send("User not found");
      return;
    }
    res.send(userDoc);
  } catch (err) {
    console.error("Error in retrieving user by ID:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = new user(req.body);
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    console.error("Error in creating user:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const scholarshipId = req.body.scholarshipId;

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $push: { scholarships: scholarshipId } },
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    console.error("Error in updating user scholarships:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
