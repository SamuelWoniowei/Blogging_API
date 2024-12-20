
import request from "supertest";
import app from "../index.js";
import setupTestDB from "./utils/testSetup.js";

setupTestDB();

describe("GET /", () => {
  it("should return a 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toEqual("Hello World");
  });
});
