const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/db")

const userRouter = require("./routes/routers/userRouter");
const userTypeRouter = require("./routes/routers/userTypeRouter");
const serviceRouter = require("./routes/routers/serviceRouter");
const appointmentRouter = require("./routes/routers/appointmentRouter");
const app = express();

app.use(express.json());
app.use(cors());


app.use("/user", userRouter);
app.use("/userType", userTypeRouter)
app.use("/services", serviceRouter)
app.use("/appointments", appointmentRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is listening on host ${PORT}`)
})
