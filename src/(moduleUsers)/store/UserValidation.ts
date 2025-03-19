import Joi from "joi";

export const LoginValidationSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    name: Joi.string().optional().allow(null, '').label("Name")
});


export const UserRegistrationValidationSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).max(255).required(),
    confirmPassword: Joi.string().min(6).max(255).required(),
    // Joi.any().valid(Joi.ref('password')).required().messages({
    //     'any.only': 'Passwords do not match',
    // }),
});


