const {Types} = require('mongoose');

const {CustomError} = require('../errors');

module.exports = {

    isIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const valid = Types.ObjectId.isValid(userId);

            if (!valid) {
                return next(new CustomError('Id is not valid'));
            }

            next();
        }catch (e) {
            next(e);
        }
    }

};
