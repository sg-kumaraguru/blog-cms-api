import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);

export default app;
