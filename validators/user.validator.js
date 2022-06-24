const Joi = require('joi');

const {nameValidator, ageValidator, emailValidator, passwordValidator} = require('./share.validator');

module.exports = {

    userValidForCreate: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),

    userValidForUpdate: Joi.object({
        name: nameValidator,
        age: ageValidator
    }),

};
