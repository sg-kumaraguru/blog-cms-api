import app from "./app/app.js";
import { connectDB } from "./app/config/db.js";
import { config } from "./app/config/config.js";


async function startServer() {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log("Server is running on port 5000");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
