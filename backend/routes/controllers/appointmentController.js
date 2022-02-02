const {Appointment} = require("../../db/models/appointment");


const addAppointment = async (req,res) => {
    const {requestSender, serviceOwner, service, date, state} = req.body;

    const newAppointment = new Appointment({
        requestSender,
        serviceOwner,
        service,
        date,
        state
    })
    try {
        const createdAppointment = await newAppointment.save();

        res.status(201).json({
            message: "Appointment Created",
            appointment: createdAppointment,
        })
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}

const getAppointmentsByRequestSender = async (req,res)=>{
    const rSenderId = req.token.userId;

    try {
        const foundAppointments = await Appointment.find({
            requestSender:rSenderId})
            .populate("requestSender")
            .populate("serviceOwner")
            .populate("service");

        if (foundAppointments.length === 0 ){
            res.status(404).json({message:"you don't have any appointments at the moment"})
            return
        }

        res.status(200).json({
            message: "appointments found",
            appointments: foundAppointments,
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}


const getPendingAppointmentsByServiceOwner = async (req,res) => {
    const sOwnerId = req.token.userId;

    try {
        const foundAppointments = Appointment.find({
            serviceOwner: sOwnerId,
            state: "pending"
        })
            .populate("requestSender")
            .populate("serviceOwner")
            .populate("service");

        if(foundAppointments.length === 0){
            res.status(404).json({message: "You have no pending appointments at the moment "})
            return
        }

        res.status(200).json({
            message: "appointments found",
            appointments: foundAppointments,
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }

}

const getAcceptedAppointmentsByServiceOwner = async (req,res) => {
    const sOwnerId = req.token.userId;

    try {
        const foundAppointments = Appointment.find({
            serviceOwner: sOwnerId,
            state: "accepted"
        })
            .populate("requestSender")
            .populate("serviceOwner")
            .populate("service");

        if(foundAppointments.length === 0){
            res.status(404).json({message: "You have no pending appointments at the moment "})
            return
        }

        res.status(200).json({
            message: "appointments found",
            appointments: foundAppointments,
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }

}

const updateAppointments = async (req,res) => {
    const appointmentId = req.query.appointmentId

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, req.body)

        res.status(200).json({
            message: "appointment updated",
            appointment: updatedAppointment,
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}


module.exports = {
    addAppointment,
    getPendingAppointmentsByServiceOwner,
    getAppointmentsByRequestSender,
    getAcceptedAppointmentsByServiceOwner,
    updateAppointments,
}