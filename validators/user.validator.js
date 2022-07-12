const Joi = require('joi');

const {nameValidator, ageValidator, emailValidator, passwordValidator, phoneValidator} = require('./share.validator');

module.exports = {

    userValidForCreate: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        phone: phoneValidator.required(),
    }),

    userValidForUpdate: Joi.object({
        name: nameValidator,
        age: ageValidator
    }),

};
