const userRouter = require('express').Router();

const userController = require('../controllers/user.controller');
const {commonMiddleware, userMiddleware} = require('../middlewares');

userRouter.get('/', userController.findUsers);
userRouter.post('/', userMiddleware.isUserValidForCreate, userController.createUser);

userRouter.get('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserExist,
    userController.getUserById);
userRouter.put('/:userId',
    commonMiddleware.isIdValid,
    userController.updateUser);
userRouter.delete('/:userId',
    commonMiddleware.isIdValid,
    userController.deleteUser);

module.exports = userRouter;
