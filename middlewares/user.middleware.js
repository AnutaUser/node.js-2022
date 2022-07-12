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
};
