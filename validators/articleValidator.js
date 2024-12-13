import Joi from "joi";

const articleSchema = Joi.object({
  title: Joi.string().required().min(3).max(255).messages({
    "string.base": "Title should be a type of text",
    "string.empty": "Title cannot be an empty field",
    "string.min": "Title should have a minimum length of {#limit}",
    "string.max": "Title should have a maximum length of {#limit}",
    "any.required": "Title is a required field"
  }),
  
  description: Joi.string().min(10).max(500).messages({
    "string.base": "Description should be a type of text",
    "string.empty": "Description cannot be an empty field",
    "string.min": "Description should have a minimum length of {#limit}",
    "string.max": "Description should have a maximum length of {#limit}",
  }),

  author: Joi.string().min(3).max(100).messages({
    "string.base": "Author should be a type of text",
    "string.empty": "Author cannot be an empty field",
    "string.min": "Author should have a minimum length of {#limit}",
    "string.max": "Author should have a maximum length of {#limit}",
  }),

  read_count: Joi.number().integer().min(0).messages({
    "number.base": "Read count should be a number",
    "number.integer": "Read count should be an integer",
    "number.min": "Read count cannot be negative",
  }),

  reading_time: Joi.number().integer().min(1).messages({
    "number.base": "Reading time should be a number",
    "number.integer": "Reading time should be an integer",
    "number.min": "Reading time should be at least 1 minute",
  }),

  tags: Joi.array().items(Joi.string()).messages({
    "array.base": "Tags should be an array of strings",
  }),

  body: Joi.string().required().messages({
    "string.base": "Body should be a type of text",
    "string.empty": "Body cannot be empty",
    "any.required": "Body is a required field"
  }),

  timestamp: Joi.date().timestamp().messages({
    "date.base": "Timestamp should be a valid date",
  }),
});

export default articleSchema;