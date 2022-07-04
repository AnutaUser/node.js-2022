const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {configs} = require('../configs');
const emailTemplate = require('../email-templates');
const {CustomError} = require('../errors');

module.exports = {

    sendMail: async (userMail = '', emailActions = '', context = {}) => {

        const transporter = nodemailer.createTransport({
            from: 'No reply',
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'email-templates', 'views'),
            extName: '.hbs',
        };

        transporter.use('compile', hbs(hbsOptions));

        const templateInfo = emailTemplate[emailActions];

        if (!templateInfo) {
            return new CustomError('Wrong email action!', 500);
        }

        context.frontendURL = configs.FRONTEND_URL;

        return transporter.sendMail({
            to: userMail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context,
        });
    },

};
