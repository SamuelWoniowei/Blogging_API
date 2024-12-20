import e from "express";
import Article from "../models/article.js";
import calculateReadingTime from "../utils/calculateReadingTime.js";
import { checkArticleExistence } from "../utils/checkExistence.js";
import {
  handleBadRequest,
  handleError,
  handleForbidden,
  handleNotFound,
  handleSuccess,
} from "../utils/responses.js";

export const addArticle = async (req, res) => {
  const { body } = req.body;
  try {
    const reading_time = calculateReadingTime(body);
    const article = { ...req.body, reading_time, state: "draft" };
    const newArticle = await Article.create(article);
    return handleSuccess(res, "Article created successfully", newArticle, 201);
  } catch (error) {
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return handleBadRequest(res, `${duplicatedField} already exists`);
    }
    return handleError(res, error);
  }
};

export const getArticles = async (req, res) => {
  const { author, title, tags, sort } = req.query;
  try {
    const { page = 1, limit = 20 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const filter = {};

    if (author) {
      filter.$or = [
        { "author.first_name": { $eq: author } },
        { "author.last_name": { $eq: author } },
      ];
    }
    if (title) filter.title = { $regex: title, $options: "i" };
    if (tags) filter.tags = { $in: tags.split(",").map((tag) => tag.trim()) };

    const sortFilter = {};

    if (sort === "reading_time") {
      sortFilter.reading_time = -1;
    } else if (sort === "read_count") {
      sortFilter.read_count = -1;
    } else {
      sortFilter.createdAt = -1;
    }

    const skip = (options.page - 1) * options.limit;
    const articles = await Article.find(filter)
      .populate("author", "first_name last_name email")
      .sort(sortFilter)
      .skip(skip)
      .limit(options.limit)
      .exec();
    if (!articles.length) {
      return handleNotFound(res, "No articles found");
    }
    return handleSuccess(res, "Articles retrieved successfully", articles);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id)
      .populate("author", "first_name last_name email")
      .exec();
    if (!article) {
      return handleNotFound(res, "Article not found");
    }

    await Article.findByIdAndUpdate(id, { $inc: { read_count: 1 } });
    return handleSuccess(res, "Article retrieved successfully", article);
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const article = await checkArticleExistence(id, res);
    if (!article) return;

    if (!article.author._id.equals(userId)) {
      return handleForbidden(res, "You are not allowed to delete this article");
    }
    await Article.findByIdAndDelete(id);

    return handleSuccess(res, "Article deleted successfully");
  } catch (error) {
    return handleError(res, error);
  }
};

export const publishArticle = async (req, res) => {
  const { id } = req.params;
  const userId  = req.user.id;

  try {
    const article = await checkArticleExistence(id, res);
    if (!article) return;

    if (!article.author._id.equals(userId)) {
      return handleForbidden(
        res,
        "You are not allowed to publish this article"
      );
    }

    article.state = article.state === "draft" ? "published" : "draft";
    const updatedArticle = await article.save();

    return handleSuccess(res, "Article published successfully", updatedArticle);
  } catch (error) {
    return handleError(res, error);
  }
};
