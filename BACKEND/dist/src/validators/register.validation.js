"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidation = exports.loginValidation = exports.RegisterValidation = void 0;
const express_validation_1 = require("express-validation");
exports.RegisterValidation = express_validation_1.Joi.object({
    first_name: express_validation_1.Joi.string().required(),
    last_name: express_validation_1.Joi.string().required(),
    email: express_validation_1.Joi.string().email().required(),
    password: express_validation_1.Joi.string().required(),
    password_confirm: express_validation_1.Joi.string().required(),
});
exports.loginValidation = express_validation_1.Joi.object({
    email: express_validation_1.Joi.string().email().required(),
    password: express_validation_1.Joi.string().required(),
});
exports.passwordValidation = express_validation_1.Joi.object({
    oldPassword: express_validation_1.Joi.string().required(),
    newPassword: express_validation_1.Joi.string().required()
});
