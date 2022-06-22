const Joi = require('joi');

const {constants} = require('../configs');

module.exports = {
    nameValidator: Joi.string().alphanum().min(3).max(30).trim(),
    ageValidator: Joi.number().integer().min(1).max(130),
    emailValidator: Joi.string().regex(constants.EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().regex(constants.PASSWORD_REGEX).min(8).trim(),
};
