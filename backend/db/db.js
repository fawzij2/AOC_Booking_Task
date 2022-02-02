const mongoose = require("mongoose");




mongoose.connect(process.env.HOST_NAME || "mongodb://localhost:27017/AOCTask",error => {
  if (error){
    console.log(error)
    return

  }

  console.log("database connected")
})
