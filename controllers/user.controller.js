const {userService} = require('../services');
const {hashPassword} = require('../services/password.service');

module.exports = {

    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const  hashedPassword = await hashPassword(req.body.password);

            const newUser = await userService.createOne({...req.body, password: hashedPassword});

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
            const {dataUser} = req;
            const {userId} = req.params;

            const updatedUser = await userService.updateOne({_id: userId}, dataUser);

            res.status(201).json(updatedUser);

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