import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import { connectTestDB } from "../db.js";
let mongoServer; 

beforeAll(async () => {
  mongoServer = await connectTestDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("GET /", () => {
  it("should return a 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toEqual("Hello World");
  });
});
