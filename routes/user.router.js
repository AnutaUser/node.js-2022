const router = require('express').Router();

const {userController} = require('../controllers');
const {commonMiddleware, userMiddleware, authMiddleware} = require('../middlewares');

router.get('/',
    userMiddleware.isUserQueryValid,
    userController.findAll);
router.post('/',
    userMiddleware.isUserUnique,
    userMiddleware.isUserValidForCreate,
    userController.createOne);

router.get('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.findOne);
router.put('/:userId',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userMiddleware.isUserValidForUpdate,
    userController.updateOne);
router.delete('/:userId',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.deleteOne);

module.exports = router;
