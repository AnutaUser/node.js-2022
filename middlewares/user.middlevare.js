const {CustomError} = require('../errors');
const {userService} = require('../services');
const {userValidator, queryUserValidator} = require('../validators');
const {User} = require('../dataBase');

module.exports = {

    isUserValidForCreate: async (req, res, next) => {
        try {
            const {error, value} = await userValidator.createUserValidator.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailRegistered: async (req, res, next)=>{
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new CustomError('This email already exist!', 409)
            }

            next();
        }catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.getOne({_id: userId});

            if (!user) {
                return next(new CustomError(`User with id ${userId} not exist!`));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {error, value} = await userValidator.updateUserValidator.validate(req.body);

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
            const {error, value} = await queryUserValidator.queryUserValidator.validate(req.query);

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
