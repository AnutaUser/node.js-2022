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

    updateUser: async (req, res) => {
        try {
            const {name, age} = req.body;
            const {userId} = req.params;

            if (name.length < 3) {
                return res.status(400).json('Enter valid name!');
            }
            if (!Number.isInteger(age) || age < 16) {
                return res.status(400).json('Enter valid age!');
            }

            const users = await userService.reader();

            const index = users.findIndex((user) => user.id === +userId);

            if (index === -1) {
                res.status(400).json(`User with id ${userId} not exist!`);
            }

            // const updateUser = Object.assign(users[index], ...req.body);
            const updateUser = {...users[index], ...req.body};

            users.splice(index, 1);
            await userService.writer([...users, updateUser]);

            res.json(updateUser);

        } catch (e) {
            res.status(400).json(e.message || 'Not Found');
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params;

            const users = await userService.reader();

            const index = users.findIndex((user) => user.id === +userId);

            if (index === -1) {
                res.status(400).json(`User with id ${userId} not exist!`);
            }

            users.splice(index, 1);

            await userService.writer(users);

            res.sendStatus(204);

        } catch (e) {
            res.status(400).json(e.message || 'Not Found');
        }
    }

};
