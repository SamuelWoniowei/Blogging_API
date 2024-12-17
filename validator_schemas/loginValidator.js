import Joi from "joi";

const loginSchema = Joi.object({
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

export default loginSchema;
