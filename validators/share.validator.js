const Joi = require('joi');

const {constants} = require('../configs');

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(30).trim(),
    ageValidator: Joi.number().integer().min(16).max(130),
    emailValidator: Joi.string().regex(constants.EMAIL_REGEX).trim().lowercase(),
    passwordValidator: Joi.string().regex(constants.PASSWORD_REGEX).trim().min(8),
};
