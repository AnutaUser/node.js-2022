const {userService, passwordService} = require('../services');
const {userPresenter} = require('../presenters');

module.exports = {

    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll(req.query);

            const userForResponse = users.map(user => userPresenter.userPresenter(user));

            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const  hash = await passwordService.hashPassword(req.body.password);

            const newUser = await userService.createOne({...req.body, password: hash});

            const userForResponse = userPresenter.userPresenter(newUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;

            const userForResponse = userPresenter.userPresenter(user);

            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const updatedUser = await userService.updateOne({_id: userId}, req.body);

            const userForResponse = userPresenter.userPresenter(updatedUser);

            res.status(201).json(userForResponse);

        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteOne({_id: userId});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

};