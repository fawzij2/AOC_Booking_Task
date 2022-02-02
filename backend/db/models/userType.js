const mongoose = require("mongoose");

const userTypeSchema = new mongoose.Schema({
  type:{type: String},
  permissions: [String],
});


module.exports.UserType = mongoose.model("UserType", userTypeSchema);
