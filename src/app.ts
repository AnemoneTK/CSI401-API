import express from "express";
import cors from "cors";
import helmet from "helmet";

//Routes import
import studentRoute from "./Routes/studentRoute";
import salaryRoute from "./Routes/salaryRoute";
import calNumRoute from "./Routes/calNumRoute";
import conditionRoute from "./Routes/conditionRoute";
import loopRoute from "./Routes/loopRoute";
import authRoute from "./Routes/authRoute";
import memberRoute from "./Routes/memberRoute";
import usersRoute from "./Routes/usersRoute";
import employeeRoute from "./Routes/employeeRoutes";
//app use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

//Routes path
app.use("/api/students", studentRoute);
app.use("/api", salaryRoute);
app.use("/api", calNumRoute);
app.use("/api", conditionRoute);
app.use("/api", loopRoute);

app.use("/auth", authRoute);
app.use("/member", memberRoute);
app.use("/api", usersRoute);
app.use("/employee", employeeRoute);

export default app;
