import express from "express";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes.js";
import connectDB from "./db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/articles", articleRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
