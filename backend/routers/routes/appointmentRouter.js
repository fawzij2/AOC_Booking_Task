const express = require("express");
const {addAppointment, getPendingAppointmentsByServiceOwner, getAcceptedAppointmentsByServiceOwner,
    getAppointmentsByRequestSender, updateAppointments
} = require("../controllers/appointmentController");
const auhentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const appointmentRouter= express.Router();

appointmentRouter.post("/",auhentication,authorization("book"), addAppointment);
appointmentRouter.get("/pending",auhentication, getPendingAppointmentsByServiceOwner);
appointmentRouter.get("/accepted",auhentication, getAcceptedAppointmentsByServiceOwner);
appointmentRouter.get("/sender",auhentication,getAppointmentsByRequestSender);
appointmentRouter.put("/",auhentication, authorization("approve/decline"), updateAppointments);

module.exports = appointmentRouter;