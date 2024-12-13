import Article from "../models/article.js";

export const addArticle = async (req, res) => {
  const article = { ...req.body, state: "draft" };
  try {
    const newArticle = await Article.create(article);
    return res.status(201).json({
      status: "success",
      message: "Article created successfully",
      data: newArticle,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        status: "error",
        message: `${duplicatedField} already exists. Please use a different value.`,
        data: error.keyValue,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: error,
    });
  }
};
