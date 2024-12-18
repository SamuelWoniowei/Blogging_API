import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const connectTestDB = async () => {
  try {
    await mongoose.disconnect();
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log(mongoUri);
    await mongoose.connect(mongoUri);
    console.log("mongoserver: ", mongoServer);
    return mongoServer;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export { connectDB, connectTestDB };
