import mongoose from "mongoose";
import { connectTestDB } from "../../db.js";

let mongoServer;

const dbConnect = async () => {
  mongoServer = await connectTestDB();
};

const dbDisconnect = async () => {
  console.log(mongoServer);
  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

  if (mongoServer) {
    await mongoServer.stop();
  }
};

export { dbConnect, dbDisconnect };
