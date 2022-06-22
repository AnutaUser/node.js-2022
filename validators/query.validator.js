const Joi = require('joi');

const {emailValidator, nameValidator, ageValidator} = require('./share.validator');

module.exports = {
    queryUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
    }),

};
