import express from "express";
import articleRoutes from "./routes/articleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB, connectTestDB } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  if (process.env.NODE_ENV === "test") {
    await connectTestDB(); 
    console.log("In-memory DB connected for testing");
  } else {
    await connectDB();
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1/articles", articleRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);

  app.get("/", (req, res) => {
    res.status(200).send("Hello World");
  });

  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
