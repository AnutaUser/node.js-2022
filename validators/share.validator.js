const Joi = require('joi');

const {EMAIL_REGEX, PASSWORD_REGEX} = require('../configs/configs');

module.exports={
    emailValidator: Joi.string().regex(EMAIL_REGEX).lowercase(),
    passwordValidator: Joi.string().regex(PASSWORD_REGEX).min(8)
}