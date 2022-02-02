const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const user = new mongoose.Schema({
  username: {type: String, required:true },
  password: {type: String, required: true},
  email: {type: String, required: true},
  age: {type: Number},
  type: {type: mongoose.SchemaTypes.ObjectId, ref:"UserType", required:true}
})

user.pre("save", async function(){
  this.username = this.username.toLowerCase();
  this.password = await bcrypt.hash(this.password,10)
})

module.exports.User = mongoose.model("User", user);
