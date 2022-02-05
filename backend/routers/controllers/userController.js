const {User} = require("../../db/models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserType} = require("../../db/models/userType");


const logIn = async (req,res) => {
  const {username, password} = req.body;

  try {
    const foundUser = await User.findOne({username});

    if (!foundUser){
      res.status(404).json({message: "user doesn't exist"})
      return
    }

    const passwordCompareResult = await bcrypt.compare(password, foundUser.password)

    if (!passwordCompareResult){
      res.status(401).json({message: "incorrect password"})
    }

    const payload = {
      userId: foundUser._id,
      userType: foundUser.type,
    };


    const secret = process.env.SecretKey || "secretUnknown";

    const token = await jwt.sign(payload,secret,{})


    res.status(200).json({
      message: "login successful",
      token,
      userType:foundUser.type,
      username:foundUser.username,
    })
  } catch (e) {
    res.json(500).json({message:e.message})
  }
  
}


const register = async (req,res)=>{
  const {username, password, email, age, userType} = req.body;
  try {
    const foundType = await UserType.findOne({type:userType});

    const newUser = new User({
      username,
      password,
      email,
      age,
      type: foundType._id,
    })

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "user created",
      user: savedUser,
    })
  }catch (e) {
    res.status(500).json({message:e.message})
  }

}

module.exports = {
  logIn,
  register
}
