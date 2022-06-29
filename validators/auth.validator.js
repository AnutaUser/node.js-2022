const Joi = require('joi');

const {emailValidator, passwordValidator} = require('./share.validator');

module.exports = {

    loginValidator: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),

};
