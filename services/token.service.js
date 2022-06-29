const jwt = require('jsonwebtoken');

const {CustomError} = require('../errors');
const {constants} = require('../configs');
const {tokenTypeEnum} = require('../enums');

module.exports = {

    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, constants.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, constants.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

        return {access_token, refresh_token};
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret;

            if (tokenType === tokenTypeEnum.ACCESS) secret = constants.ACCESS_TOKEN_SECRET;
            if (tokenType === tokenTypeEnum.REFRESH) secret = constants.REFRESH_TOKEN_SECRET;

            return jwt.verify(token, secret);

        } catch (e) {
            return new CustomError('Token not valid', 401);
        }
    },


};
