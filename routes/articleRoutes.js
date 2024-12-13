import express from "express";
import { addArticle } from "../controllers/articleControllers.js";
import validateArticle from "../middlewares/validateArticle.js";

const router = express.Router();

router.post("/", validateArticle, addArticle);
export default router;
