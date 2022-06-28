const {passwordService, tokenService} = require('../services');
const {OAuth} = require('../dataBase');

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

    logout: (req, res, next) => {
        try {
            const tokens = generateAuthTokens();

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

};
