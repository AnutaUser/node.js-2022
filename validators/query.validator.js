const Joi = require('joi');

const {nameValidator, ageValidator, emailValidator} = require('./share.validator');

module.exports = {

    userQueryValid: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
    }),

};
