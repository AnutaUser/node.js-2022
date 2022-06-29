module.exports = {
    EMAIL_REGEX: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,

    ACCESS_TOKEN_SECRET: 'secret_access',
    REFRESH_TOKEN_SECRET: 'secret_refresh',
    AUTHORIZATION: 'Authorization',
};
