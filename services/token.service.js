const jwt = require('jsonwebtoken');

const {CustomError} = require('../errors');
const {constants} = require('../configs');

module.exports = {

    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, constants.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, constants.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

        return {access_token, refresh_token};
    },

    checkAccessToken: (token = '') => {
        try {
            return jwt.verify(token, constants.ACCESS_TOKEN_SECRET);
        } catch (e) {
            return new CustomError('Token not valid', 401);
        }
    },

};
