const {CustomError} = require('../errors');
const {userService} = require('../services');
const {userValidator} = require('../validators');
const {User} = require('../dataBase');

module.exports = {

    isUserValidForCreate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);

            if (error) {
                throw new CustomError(error.details[0].message);
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
            const {name, age} = req.body;

            if (name && name.length < 2) {
                return next(new CustomError('Enter valid name'));
            }

            if (age && !Number.isInteger(age) || age < 18) {
                return next(new CustomError('Enter valid age'));
            }

            req.dataUser = {name, age};

            next();
        } catch (e) {
            next(e);
        }
    }


};
