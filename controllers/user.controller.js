const {userService} = require('../services');

module.exports = {

    findUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.body);
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);

            res.status(201).json(newUser);

        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;

            res.json(user);

        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const updateUser = await userService.updateOneUser({_id: userId}, req.dataForUpdate);

            res.status(201).json(updateUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteUser({_id: userId});
            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    }
};


