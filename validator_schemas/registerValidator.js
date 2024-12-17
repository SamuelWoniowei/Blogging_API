import Joi from "joi";

const registerSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "string.base": "First name should be a type of text",
    "string.empty": "First name cannot be an empty field",
    "any.required": "First name is a required field",
  }),

  last_name: Joi.string().required().messages({
    "string.base": "Last name should be a type of text",
    "string.empty": "Last name cannot be an empty field",
    "any.required": "Last name is a required field",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.empty": "Email cannot be an empty field",
    "string.email": "Email should be a valid email",
    "any.required": "Email is a required field",
  }),

  password: Joi.string().required().min(6).messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password cannot be an empty field",
    "string.min": "Password should have a minimum length of {#limit}",
    "any.required": "Password is a required field",
  }),
});

export default registerSchema;