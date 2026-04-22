import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import blogPostRouter from "./routes/blogPostRouter.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/post", blogPostRouter)

export default app;
