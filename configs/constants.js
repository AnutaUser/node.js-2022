module.exports = {
    EMAIL_REGEX: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,
    PHONE_REGEX: /\(?\+\d{1,3}\)? ?-?\d{1,3} ?-?\d{3,5} ?-?\d{4}( ?-?\d{3})? ?(\w{1,10}\s?\d{1,6})?/,

    AUTHORIZATION: 'Authorization',

    IMAGE_MAX_SIZE: 3 * 1024 * 1024,
    IMAGE_MIMETYPES: ['image/gif', 'image/jpeg', 'image/png']
};
