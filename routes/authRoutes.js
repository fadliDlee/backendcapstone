const Joi = require('joi');
const AuthController = require('../controllers/authController');

module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: AuthController.register,
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().min(6).required(),
                    email: Joi.string().email().required(),
                }),
            },
        },
    },
    {
        method: 'POST',
        path: '/login',
        handler: AuthController.login,
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                }),
            },
        },
    },
];
