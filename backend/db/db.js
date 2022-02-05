const mongoose = require("mongoose");




mongoose.connect("mongodb+srv://dbAdmin:g0KGv4jnqx1lQBPy@project4.zrybg.mongodb.net/AOCTask?retryWrites=true&w=majority" || "mongodb://localhost:27017/AOCTask",error => {
  if (error){
    console.log(error)
    return

  }

  console.log("database connected")
})
