const express = require("express");
const {addType, getType} = require("../controllers/userTypeController");

const authentication = require("../middlewares/authentication")

const userTypeRouter = express.Router();


userTypeRouter.post("/add", addType);
userTypeRouter.get("/", authentication, getType)


module.exports = userTypeRouter