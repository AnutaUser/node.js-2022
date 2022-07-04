const {emailActionEnum} = require('../enums');

module.exports = {

    [emailActionEnum.WELCOME]: {
        subject: 'Welcome on board!',
        template: 'welcome'
    },

    [emailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Ops, forgot password?!',
        template: 'forgot-password'
    },

    [emailActionEnum.USER_BANNED]: {
        subject: 'Account was blocked!',
        template: 'account-blocked'
    },

    [emailActionEnum.LOGOUT]: {
        subject: 'User was logout!',
        template: 'logout'
    },

};
