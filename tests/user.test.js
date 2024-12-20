import request from "supertest";
import app from "../index.js";
import setupTestDB from "./utils/testSetup.js";
import { newArticle } from "./utils/jsonData.js";

setupTestDB();

let token;

describe("User Registration", () => {
  it("should register a new user successfully", async () => {
    const newUser = {
      first_name: "test",
      last_name: "tester",
      email: "testuser@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(newUser)
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body).toHaveProperty(
      "message",
      "User successfully created"
    );
    expect(response.body.data.email).toBe(newUser.email);
  });

  it("should return an error if the email is already taken", async () => {
    const existingUser = {
      first_name: "test",
      last_name: "tester",
      email: "testuser@example.com",
      password: "password123",
    };

    await request(app)
      .post("/api/v1/auth/register")
      .send(existingUser)
      .expect(201);

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(existingUser)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Email already in use");
  });

  it("should return an error if required fields are missing", async () => {
    const incompleteUser = {
      email: "incompleteuser@example.com",
    };

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(incompleteUser)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Validation error");
  });

  it("should login and return a token", async () => {
    const newUser = {
      first_name: "test",
      last_name: "tester",
      email: "testuser@example.com",
      password: "password123",
    };

    await request(app).post("/api/v1/auth/register").send(newUser).expect(201);

    const userCredentials = {
      email: "testuser@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(userCredentials)
      .expect(200);
    expect(response.body).toHaveProperty(
      "message",
      "User logged in successfully"
    );
    expect(response.body.data.email).toBe(userCredentials.email);
    token = response.body.data.token;
  });
});

export { token };
