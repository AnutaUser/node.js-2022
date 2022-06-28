const router = require('express').Router();

const {authController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.post('/login', userMiddleware.isUserEmailPresent, authController.login);
router.post('/logout', authController.logout);

module.exports = router;
