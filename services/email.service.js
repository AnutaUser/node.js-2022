const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {constants} = require('../configs');
const emailTemplates = require('../email-templates');
const {CustomError} = require('../errors');

module.exports = {
    sendMail: async (userMail = '', emailAction = '', locals = {}) => {

        const templateParse = new EmailTemplates({
            views: {root: path.join(process.cwd(), 'email-templates')}
        });

        const templateInfo = emailTemplates[emailAction];

        if (!templateInfo) {
            return new CustomError('Wrong email action!', 500);
        }

        locals.frontendURL = 'https://www.google.com/';
        console.log(locals);

        const html = await templateParse.render(templateInfo.template, locals);

        const transporter = nodemailer.createTransport({
            auth: {
                user: constants.NO_REPLY_EMAIL,
                pass: constants.NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });

        return transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    }

};
