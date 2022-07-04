module.exports = {
    PORT: process.env.PORT || 5500,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'ats',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'rts',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'bezkorovainaanna048@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '17151715',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
};
