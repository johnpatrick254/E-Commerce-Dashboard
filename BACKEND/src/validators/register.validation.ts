import {Joi} from "express-validation";

export const RegisterValidation = Joi.object(
    {
        first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),
        password_confirm:Joi.string().required(),
    }
)
export const loginValidation = Joi.object(
    {
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    }
)
export const passwordValidation = Joi.object(
    {
        oldPassword:Joi.string().required(),
        newPassword:Joi.string().required()
    }
)
