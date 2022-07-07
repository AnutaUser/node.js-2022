const {userService, passwordService, s3Service} = require('../services');
const {userPresenter} = require('../presenters');

module.exports = {

    findAll: async (req, res, next) => {
        try {
            const users = await userService.findAll(req.query);

            const usersForResponse = users.map(user => userPresenter.userPresenter(user));

            res.json(usersForResponse);
        } catch (e) {
            next(e);
        }
    },

    createOne: async (req, res, next) => {
        try {
            const avatar = '';

            const hash = await passwordService.hash_password(req.body.password);

            const newUser = await userService.createOne({...req.body, password: hash});

            const {Location} = await s3Service.uploadFile(req.files.userAvatar, newUser, newUser._id);

            const userWithPhoto = await userService.updateOne(newUser._id, {avatar: Location}, {new: true});

            const newUserForResponse = userPresenter.userPresenter(userWithPhoto);

            res.status(201).json(newUserForResponse);
        } catch (e) {
            next(e);
        }
    },

    findOne: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOne({_id: userId});

            const userForResponse = userPresenter.userPresenter(user);

            res.json(userForResponse);

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
    }

};
