const mongoose = require("mongoose");

var user = mongoose.model("User", {
  userName: { type: String },
  email: { type: String },
  password: { type: String },
  scholarships: [{ type: String }],
});

module.exports = { user };
