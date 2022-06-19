const {userService} = require('../services');
const {CustomError} = require('../errors');

module.exports = {
    isUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.findOneUser({_id: userId});

            if (!user) {
                return next(new CustomError('User not found!'));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

 isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});

            if (user) {
                return next(new CustomError(`User with email ${email} exist!`, 409));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForCreate: async (req, res, next) => {
        try {
            const {name, age, email, password} = req.body;

            if (!name || name.length < 3) {
                return next(new CustomError('Enter valid name!'));
            }
            if (!age || !Number.isInteger(age) || age < 16) {
                return next(new CustomError('Enter valid age!'));
            }
            if (!email || !email.includes('@')) {
                return next(new CustomError('Enter valid email!'));
            }
            if (!password || password.length < 8) {
                return next(new CustomError('Enter valid password!'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (name && name.length < 3) {
                return next(new CustomError('Enter valid name!'));
            }
            if (age && !Number.isInteger(age) || age < 16) {
                return next(new CustomError('Enter valid age!'));
            }

            req.dataForUpdate = {name, age};

            next();
        } catch (e) {
            next(e);
        }
    }
};

