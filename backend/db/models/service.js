const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name:{type: String, required: true},
  serviceProvider: {type: mongoose.SchemaTypes.ObjectId, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  image:{type:String}
})


module.exports.Service = mongoose.model("Service",serviceSchema)
