const {CustomError} = require('../errors');
const {tokenService} = require('../services');
const {OAuth} = require('../dataBase');

module.exports = {

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                return next(new CustomError('No token!', 401));
            }

            tokenService.checkAccessToken(access_token);
            console.log(access_token);

            const tokenInfo = await OAuth.findOne({access_token}).populate('userId');

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401))
            }
            // console.log(tokenInfo);
            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },

};
