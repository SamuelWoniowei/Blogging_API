import Article from "../models/article.js";
import User from "../models/user.js";
import {
  handleError,
  handleNotFound,
  handleSuccess,
} from "../utils/responses.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: error,
    });
  }
};

export const getUserArticles = async (req, res) => {
  const { id } = req.params;
  const { state, page = 1, limit = 10 } = req.query;
  try {
    const filter = {
      author: id,
    };

    if (state) {
      filter.state = state;
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const skip = (options.page - 1) * options.limit;
    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(options.limit)
      .exec();

    if (!articles.length) {
      return handleNotFound(res, "User articles not found");
    }
    return handleSuccess(res, "User articles retrieved successfully", articles);
  } catch (error) {
    return handleError(res, error);
  }
};
