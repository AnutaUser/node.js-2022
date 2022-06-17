const {Types} = require('mongoose');

const {CustomError} = require('../errors');

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {userId} = req.params;

            const isValid = Types.ObjectId.isValid(userId);
            if (!isValid) {
                return next(new CustomError('Not valid ID'));
            }

            next();
        } catch (e) {
            next(e);
        }
    }

};
