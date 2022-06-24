const router = require('express').Router();

const {userController} = require('../controllers');
const {commonMiddleware, userMiddleware} = require('../middlewares');

router.get('/',
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
    userMiddleware.isUserPresent,
    userMiddleware.isUserValidForUpdate,
    userController.updateOne);
router.delete('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.deleteOne);

module.exports = router;
