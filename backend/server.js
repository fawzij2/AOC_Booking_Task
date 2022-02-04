const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const db = require("./db/db")

const userRouter = require("./routers/routes/userRouter");
const userTypeRouter = require("./routers/routes/userTypeRouter");
const serviceRouter = require("./routers/routes/serviceRouter");
const appointmentRouter = require("./routers/routes/appointmentRouter");
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.use("/user", userRouter);
app.use("/userType", userTypeRouter)
app.use("/services", serviceRouter)
app.use("/appointments", appointmentRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is listening on host ${PORT}`)
})
