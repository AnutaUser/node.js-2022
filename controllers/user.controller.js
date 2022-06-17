const User = require('../dataBase/User');
const CError = require('../error/CustomError');

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);

        } catch (e) {
            next(e);
        }

    },

    createUser: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res.status(201).json(user);

        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {userId = ''} = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new CError(`User with id ${userId} not exist!`);
            }

            res.json(user);

        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {userId = ''} = req.params;

            const user = await User.findByIdAndUpdate({_id: userId});

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId = ''} = req.params;

            await User.findByIdAndDelete(userId);
            // await User.deleteOne({_id: userId});

            throw new CError(`User with id ${userId} was delete!`);

        } catch (e) {
            next(e);
        }
    }
};
