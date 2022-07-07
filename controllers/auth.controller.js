const {passwordService, tokenService, emailService} = require('../services');
const {OAuth, ActionToken} = require('../dataBase');
const {WELCOME} = require('../configs/email-action.enum');
const {generateActionToken} = require('../services/token.service');
const {constants, emailActionEnum} = require('../configs');

module.exports = {

    login: async (req, res, next) => {
        try {
            const {password: hash_password, _id, name} = req.user;
            const {password, email} = req.body;

            await emailService.sendMail('balabuch@i.ua', WELCOME, {userName: name});
            // await emailService.sendMail(email, WELCOME);

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
            const {access_token} = req;

            await OAuth.deleteOne({access_token});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id} = req.user;

            await OAuth.deleteMany({userId: _id});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id, name, email} = req.user;
            console.log(req.user);

            const  token = generateActionToken(emailActionEnum.FORGOT_PASSWORD, {name, _id});

            await ActionToken.create({
                userId: _id,
                token,
                actionType: emailActionEnum.FORGOT_PASSWORD
            });

            await emailService.sendMail(
                email,
                emailActionEnum.FORGOT_PASSWORD,
                {userName: name, token})

            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },


};
