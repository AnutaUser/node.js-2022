const Joi = require('joi');

const {emailValidator, passwordValidator} = require('./share.validator');

const userSubScheme = {
    name: Joi.string().alphanum().min(3).max(30).trim().required(),
    age: Joi.number().integer().min(1).max(130).required()
};

const testArraySubScheme = {
    car: Joi.boolean(),
};

module.exports = {
    newUserValidator: Joi.object({
        ...userSubScheme,
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    updateUserValidator: Joi.object(userSubScheme),

    testValid: Joi.object({
        isAdult: Joi.boolean(),
        array: Joi.array().items(testArraySubScheme).when('isAdult', {is: true, then: Joi.required()})
    })

};
