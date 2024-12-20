import request from "supertest";
import app from "../index.js";
import setupTestDB from "./utils/testSetup.js";
import { token } from "./user.test.js";
import { newArticle } from "./utils/jsonData.js";

setupTestDB();

describe("Article CRUD Operations", () => {
  it("should create an article and fetch all articles", async () => {
    const articleResponse = await request(app)
      .post("/api/v1/articles")
      .set("Authorization", `Bearer ${token}`)
      .send(newArticle)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(articleResponse.body).toHaveProperty(
      "message",
      "Article created successfully"
    );
    const response = await request(app).get("/api/v1/articles").expect(200);
    expect(response.body.data).toHaveLength(1);
  });

  it("should fail if no token is provided", async () => {
    const response = await request(app)
      .post("/api/v1/articles")
      .send(newArticle)
      .expect(403);
    expect(response.body).toHaveProperty(
      "message",
      "Access denied. No token provided."
    );
  });
});
