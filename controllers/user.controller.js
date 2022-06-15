const {userService} = require('../services');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.reader();
        res.json(users);
    } catch (e) {
        res.status(400).json(e.message || 'Unknown error!');
    }
};

const createUser = async (req, res) => {
    try {
        const {name, age} = req.body;

        if (!name || name.length < 3) {
            return res.status(400).json('Enter valid name!');
        }
        if (!age || !Number.isInteger(age) || age < 16) {
            return res.status(400).json('Enter valid age!');
        }

        const users = await userService.reader();

        const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1};

        await userService.writer([...users, newUser]);

        res.status(201).json(newUser);

    } catch (e) {
        res.status(400).json(e.message || 'Unknown error!');
    }
};

const getUserById = async (req, res) => {
    try {
        const {userId} = req.params;

        const users = await userService.reader();

        const user = users.find((user) => user.id === +userId);

        if (!user) {
            res.status(400).json(`User with id ${userId} not exist!`);
        }

        res.json(user);

    } catch (e) {
        res.status(400).json(e.message || 'Not Found');
    }
};

const updateUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
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
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};