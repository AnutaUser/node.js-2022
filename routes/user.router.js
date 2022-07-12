const router = require('express').Router();

const {userController} = require('../controllers');
const {commonMiddleware, userMiddleware, authMiddleware, fileMiddleware} = require('../middlewares');
const {userValidator, queryValidator} = require('../validators');

router.get('/',
    commonMiddleware.isDateValid(queryValidator.userQueryValid, 'query'),
    userController.findAll);
router.post('/',
    userMiddleware.isUserUnique,
    fileMiddleware.checkAvatar,
    commonMiddleware.isDateValid(userValidator.userValidForCreate),
    userController.createOne);

router.get('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.findOne);
router.put('/:userId',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    commonMiddleware.isDateValid(userValidator.userValidForUpdate),
    userController.updateOne);
router.delete('/:userId',
    commonMiddleware.isIdValid,
    // authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.deleteOne);

module.exports = router;
