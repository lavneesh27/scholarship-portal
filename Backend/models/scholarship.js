const mongoose = require("mongoose");

var scholarship = mongoose.model("Scholarship", {
  name: { type: String },
  eligibility: { type: String },
  about: { type: String },
  amount: { type: String },
});

module.exports = { scholarship };
