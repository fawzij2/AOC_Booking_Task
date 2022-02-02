const express = require("express");
const {addService, getAllServices, searchServicesByName} = require("../controllers/serviceController");

const serviceRouter = express.Router();


serviceRouter.post("/", addService);
serviceRouter.get("/", getAllServices);
serviceRouter.get("/searchName", searchServicesByName);

module.exports = serviceRouter;