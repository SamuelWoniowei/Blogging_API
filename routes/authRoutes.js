import express from "express";

import {validateLogin, validateRegister } from "../middlewares/validators.js";
import { login, register } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);

export default router;
