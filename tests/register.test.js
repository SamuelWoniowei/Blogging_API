import request from "supertest";
import app from "../index.js";
import { dbConnect, dbDisconnect } from "./utils/dbHandler.js";
beforeAll(async () => {
  await dbConnect();
});

// afterAll(async () => {
//     console.log('mongolito ', mongo);
//   await dbDisconnect(mongo);
// });

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

    // Check that the response contains a success message or the created user data
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
      .expect(400);

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(existingUser)
      .expect("Content-Type", /json/)
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
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Validation error");
  });
});
