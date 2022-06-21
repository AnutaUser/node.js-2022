const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, commonMiddleware} = require('../middlewares');

router.get('/', userController.getUsers);
router.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isEmailRegistered,
    userController.createUser);

router.get('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserExist,
    userController.getUserById);
router.put('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserExist,
    userController.updateUser);
router.delete('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserExist,
    userController.deleteUser);

module.exports = router;
