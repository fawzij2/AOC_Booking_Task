const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    requestSender: {type: mongoose.SchemaTypes.ObjectId, ref:"User", required:true},
    serviceOwner: {type: mongoose.SchemaTypes.ObjectId, ref:"User", required:true},
    service: {type: mongoose.SchemaTypes.ObjectId, ref: "Service", required:true},
    date:{type: Date, required: true},
    state:{type:String, default: "pending"},

})

module.exports.Appointment = mongoose.model("Appointment", appointmentSchema)