const express = require("express");
const {logIn, register} = require("../controllers/userController");

const userRouter = express.Router();


userRouter.post("/login", logIn);
userRouter.post("/register", register);

module.exports = userRouter;
