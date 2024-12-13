import articleSchema from "../validators/articleValidator.js";

const validateArticle = (req, res, next) => {
  const { error } = articleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      data: error.details.map((detail) => detail.message),
    });
  }

  next();
};

export default validateArticle;
