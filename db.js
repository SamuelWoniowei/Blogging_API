import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

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
    if (mongoose.connection.readyState) {
      await mongoose.disconnect();
    }

    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    return mongoServer;
  } catch (error) {
    console.error(``);
  }
};

export { connectDB, connectTestDB };
