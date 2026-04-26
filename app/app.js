import express from "express"
import cookieParser from "cookie-parser";
import helmet from "helmet";

import {errorHandler} from "./middlewares/errorMiddleware.js"
import authRouter from "./routes/authRoutes.js";
import blogPostRouter from "./routes/blogPostRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

const app = express();

app.use(helmet());
app.disable("x-powered-by");

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/post", blogPostRouter);
app.use("/comments", commentRouter);

app.use(errorHandler);

export default app;
