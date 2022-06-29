const {userValidator, queryValidator} = require('../validators');
const {CustomError} = require('../errors');
const {userService} = require('../services');

module.exports = {

    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await userService.findOne({email});

            if (userByEmail) {
                return next(new CustomError('This Email already exist!'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {userId} = req.params;

            if (!userId) {
                return next(new CustomError(`User with id ${userId} not exist!`));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForCreate: async (req, res, next) => {
        try {
            const {error, value} = await userValidator.userValidForCreate.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }
            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {error, value} = await userValidator.userValidForUpdate.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserQueryValid: async (req, res, next) => {
        try {
            const {error, value} = await queryValidator.userQueryValid.validate(req.query);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.query = value;

            next();
        } catch (e) {
            next(e);
        }
    },

};
