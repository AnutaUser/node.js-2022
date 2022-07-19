const {userService, passwordService, s3Service, emailService, smsService} = require('../services');
const {userPresenter} = require('../presenters');
const {emailActionEnum, smsActionEnum} = require('../enums');
const {smsTemplateBuilder} = require('../common');

module.exports = {

    findAll: async (req, res, next) => {
        try {

            const {data, count} = await userService.findAllWithPagination(req.query);

            const usersForResponse = data.map(user => userPresenter.userPresenter(user));

            res.json({
                ...req.query,
                usersForResponse,
                count
            });
        } catch (e) {
            next(e);
        }
    },

    createOne: async (req, res, next) => {
        try {
            const {name, email, phone, password} = req.body;

            const hash = await passwordService.hash_password(password);

            const newUser = await userService.createOne({...req.body, password: hash});

            const {Location} = await s3Service.uploadFile(req.files.avatar, newUser, newUser._id);

            const userWithPhoto = await userService.updateOne({_id: newUser._id}, {avatar: Location}, {new: true});

            const sms = smsTemplateBuilder[smsActionEnum.WELCOME]({name});

            await Promise.allSettled([
                await smsService.sendSMS(phone, sms),
                await emailService.sendMail(email, emailActionEnum.WELCOME, {name})
            ]);

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

            if (req.files?.avatar) {
                if (req.user.avatar) {
                    const {Location} = await s3Service.uploadFile(req.files.avatar, 'user', userId);
                    req.body.avatar = Location;
                } else {
                    const {Location} = await s3Service.updateFile(req.files.avatar, req.user.avatar);
                    req.body.avatar = Location;
                }
            }

            const updateUser = await userService.updateOne({_id: userId}, req.body);

            const updateUserForResponse = userPresenter.userPresenter(updateUser);

            res.json(updateUserForResponse);

        } catch (e) {
            next(e);
        }
    },

    deleteOne: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteOne({_id: userId});

            if (req.user?.avatar) {
                await s3Service.deleteFile(req.user.avatar);
            }

            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    }

};
