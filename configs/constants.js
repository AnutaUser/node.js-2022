module.exports = {
    EMAIL_REGEX: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'ats',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'rts',
    FORGOT_PASS_ACTION_SECRET: process.env.FORGOT_PASS_ACTION_SECRET || 'fg_pass',

    AUTHORIZATION: 'Authorization',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'bezkorovainaanna048@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '17151715',

    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,

};
