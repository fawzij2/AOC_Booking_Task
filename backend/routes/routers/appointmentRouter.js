const express = require("express");
const {addAppointment, getPendingAppointmentsByServiceOwner, getAcceptedAppointmentsByServiceOwner,
    getAppointmentsByRequestSender, updateAppointments
} = require("../controllers/appointmentController");

const appointmentRouter= express.Router();

appointmentRouter.post("/", addAppointment);
appointmentRouter.get("/pending", getPendingAppointmentsByServiceOwner);
appointmentRouter.get("/accepted", getAcceptedAppointmentsByServiceOwner);
appointmentRouter.get("/sender", getAppointmentsByRequestSender);
appointmentRouter.put("/", updateAppointments);

module.exports = appointmentRouter;