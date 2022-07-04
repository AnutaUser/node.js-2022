const {passwordService, tokenService, emailService} = require('../services');
const {OAuth} = require('../dataBase');
const {emailActionEnum} = require('../enums');

module.exports = {

    login: async (req, res, next) => {
        try {
            const {password: hash_password, _id} = req.user;
            const {password} = req.body;

            await passwordService.compare_password(hash_password, password);

            const tokens = tokenService.generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            });

            res.json({

                user: req.user,
                ...tokens
            });

        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = tokenService.generateAuthTokens();

            await OAuth.create({userId, ...tokens});

            res.json(tokens);

        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token, user} = req;
            const {name, email} = user;

            await OAuth.deleteOne({access_token});

            await emailService.sendMail(email, emailActionEnum.LOGOUT, {name, count: 1});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id, email, name} = req.user;

            const {deletedCount} = await OAuth.deleteMany({userId: _id});

            await emailService.sendMail(email, emailActionEnum.LOGOUT, {name, count: deletedCount});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {email, name} = req.user;

            await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, {name});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },


};
