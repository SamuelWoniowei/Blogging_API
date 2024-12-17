const validate = (validator) => (req, res, next) => {
  const { error } = validator.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      data: error.details.map((detail) => detail.message),
    });
  }

  next();
};

export default validate;