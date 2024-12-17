import express from "express";
import {
  addArticle,
  deleteArticle,
  getArticle,
  getArticles,
  publishArticle,
} from "../controllers/articleControllers.js";
import {validateArticle} from "../middlewares/validators.js";
import authenticateJWT from "../middlewares/authenticateJwt.js";

const router = express.Router();

router.post("/", validateArticle, authenticateJWT, addArticle);
router.get("/", getArticles);
router.get("/:id", getArticle);
router.delete("/:id", authenticateJWT, deleteArticle);
router.post("/:id/publish", authenticateJWT, publishArticle);
export default router;
