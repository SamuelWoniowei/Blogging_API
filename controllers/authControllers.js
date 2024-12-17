import { verifyPassword } from "../helpers/hashPassword.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  handleBadRequest,
  handleError,
  handleNotFound,
  handleSuccess,
} from "../utils/responses.js";
dotenv.config();

export const login = async (req, res) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return handleNotFound(res, "User not found");
    }
    const isMatch = await verifyPassword(user.password, password);
    if (!isMatch) {
      return handleBadRequest(res, "Invalid email or password");
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const data = { id: user._id, email: user.email, token };
    return handleSuccess(res, "User logged in successfully", data);
  } catch (error) {
    return handleError(res, error);
  }
};

export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleBadRequest(res, "Email already in use");
    }
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
    });
    res.status(201).json({
      status: "success",
      message: "User successfully created",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
