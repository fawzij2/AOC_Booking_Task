const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/db")

const userRouter = require("./route/routers/userRouter")

const app = express();

app.use(express.json());
app.use(cors());


app.use("/user", userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is listening on host ${PORT}`)
})
