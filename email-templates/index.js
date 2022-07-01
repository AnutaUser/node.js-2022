const {emailActionEnum} = require('../configs');

module.exports = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome on board!',
        template: 'welcome'
    },

    [emailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Ooops, someone forgot password!',
        template: 'forgot-password'
    },

    [emailActionEnum.ORDER_PASSWORD]: {
        subject: 'Order password?',
        template: '<div style="background: plum">Order password?</div>'
    },

};
