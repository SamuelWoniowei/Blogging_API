import loginSchema from "../validator_schemas/loginValidator.js";
import registerSchema from "../validator_schemas/registerValidator.js";
import articleSchema from "../validator_schemas/articleValidator.js";
import validate from '../utils/validate.js';

export const validateLogin = validate(loginSchema);
export const validateRegister = validate(registerSchema);
export const validateArticle = validate(articleSchema);