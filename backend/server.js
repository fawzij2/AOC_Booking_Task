const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/db")

const userRouter = require("./route/routers/userRouter");
const userTypeRouter = require("./route/routers/userTypeRouter");

const app = express();

app.use(express.json());
app.use(cors());


app.use("/user", userRouter);
app.use("/userType", userTypeRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is listening on host ${PORT}`)
})