const Joi = require('joi');

const {nameValidator, ageValidator, emailValidator} = require('./share.validator');

module.exports = {

    userQueryValid: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
        page: Joi.number().integer(),
        perPage: Joi.number().integer(),
        search: Joi.string(),
        ageLte: Joi.number().integer(),
        ageGte: Joi.number().integer(),
    }),

};
