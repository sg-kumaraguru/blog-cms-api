import express from "express"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import {errorHandler} from "./middlewares/errorMiddleware.js"
import { globalLimiter, authLimiter } from "./middlewares/rateLimitMiddleware.js";
import logger from "./middlewares/loggerMiddleware.js"

import authRouter from "./routes/authRoutes.js";
import blogPostRouter from "./routes/blogPostRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(helmet());
app.disable("x-powered-by");

app.use(
  logger({
    logBody: true,
  })
);

app.use(globalLimiter);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authLimiter, authRouter);
app.use("/post", blogPostRouter);
app.use("/comments", commentRouter);

app.use(errorHandler);

export default app;
