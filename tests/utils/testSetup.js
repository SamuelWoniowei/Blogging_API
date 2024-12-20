import mongoose from "mongoose";
import { connectTestDB } from "../../db.js";

let mongoServer;

const setupTestDB = () => {
  beforeAll(async () => {
    mongoServer = await connectTestDB();
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });
};

export default setupTestDB;
