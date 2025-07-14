import dotenv from "dotenv";
import { connectDb } from "./db/connection.db.js";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
    path: "./.env"
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

connectDb().then(() => {
    app.listen(process.env.Port || 3000, () => {
        console.log(`Server is running at Port : ${process.env.Port}`)
    });
})
.catch(err => console.log("Mongo DB Connection is failed ", err));