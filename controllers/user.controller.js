const {userService, passwordService} = require('../services');
const {userPresenter} = require('../presenters');

module.exports = {

    findAll: async (req, res, next) => {
        try {
            const users = await userService.findAll();

            const usersForResponse = users.map(user => userPresenter.userPresenter(user));

            res.json(usersForResponse);
        } catch (e) {
            next(e);
        }
    },

    createOne: async (req, res, next) => {
        try {
            const hash = await passwordService.hash_password(req.body.password);

            const newUser = await userService.createOne({...req.body, password: hash});

            res.json(newUser)
        } catch (e) {
            next(e);
        }
    },

    findOne: async (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    },

    updateOne: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const updateUser = await userService.updateOne({_id: userId}, req.body);

            res.json(updateUser);

        } catch (e) {
            next(e);
        }
    },

    deleteOne: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteOne({_id: userId});

            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    },

};
