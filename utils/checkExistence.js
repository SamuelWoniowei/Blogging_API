import mongoose from "mongoose";
import { handleBadRequest, handleNotFound } from "./responses.js";
import Article from "../models/article.js";

export const checkArticleExistence = async (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleBadRequest(res, "Invalid article ID");
  }

  const article = await Article.findById(id).populate(
    "author",
    "first_name email"
  );
  if (!article) {
    return handleNotFound(res, "Article not found");
  }

  return article;
};

// export const checkUserExistence = async (id, res) => {
//   const user = await User.findById(id);
//   if (!user) {
//     handleNotFound(res, "User not found");
//   }
//   return user;
// };
