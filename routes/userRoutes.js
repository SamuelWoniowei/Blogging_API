import express from "express";
import { getUserArticles, getUsers } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id/articles", getUserArticles);
export default router;
