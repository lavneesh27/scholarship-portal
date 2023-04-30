const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/scholarship", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection succeeded");
  })
  .catch((err) => {
    console.error("Error in DB connection:", err);
  });

module.exports = mongoose;
