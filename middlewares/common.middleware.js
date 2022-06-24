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
    }

};
