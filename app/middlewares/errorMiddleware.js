import {config} from "../config/config.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error:
      config.nodeEnv === "production"
        ? "Internal Server Error"
        : err.message,
  });
};
