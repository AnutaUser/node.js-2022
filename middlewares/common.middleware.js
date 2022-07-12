const {Types} = require('mongoose');

const {CustomError} = require('../errors');

module.exports = {

    isIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const idValid = Types.ObjectId.isValid(userId);

            if (!idValid) {
                return next(new CustomError('Not valid id!'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isDateValid: (validationSchema, dateType = 'body') => async (req, res, next) => {
        try {
            const {error, value} = await validationSchema.validate(req[dateType]);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req[dateType] = value;

            next();
        } catch (e) {
            next(e);
        }
    },


};
