const express = require("express");
const {addType} = require("../controllers/userTypeController");

const userTypeRouter = express.Router();


userTypeRouter.post("/add", addType);


module.exports = userTypeRouter