import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import fs from "fs-extra";

let mongoServer;
const BACKUP_FILE = "data/temp.json";

export async function connectDB() {
  if (process.env.NODE_ENV === "production") {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB (production)");
    return;
  }

  // Development → in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  console.log("Connected to MongoMemoryServer (development)");

  // Restore data if exists
  if (await fs.pathExists(BACKUP_FILE)) {
    const data = await fs.readJSON(BACKUP_FILE);
    for (const name of mongoose.modelNames()) {
      if (data[name]) {
        await mongoose.model(name).insertMany(data[name]);
      }
    }
    console.log("Restored data from temp.json");
  }

  process.on("SIGINT", async () => {
    const backup = {};

    for (const name of mongoose.modelNames()) {
      backup[name] = await mongoose.model(name).find();
    }

    await fs.ensureDir("data");
    await fs.writeJSON(BACKUP_FILE, backup, { spaces: 2 });

    await mongoose.connection.close();
    await mongoServer.stop();

    console.log("Saved data to temp.json");
    process.exit(0);
  });
}
