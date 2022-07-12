const {constants} = require('../configs');
const {CustomError} = require('../errors');

module.exports = {

    checkAvatar: async (req, res, next) => {
        try {
            if (!req.file?.avatar) {
                return next();
            }
            const {mimetype, size} = req.file.avatar;

            if (size > constants.IMAGE_MAX_SIZE) {
                return next(new CustomError('Max size 3 mb!'));
            }

            if (!constants.IMAGE_MIMETYPES.includes(mimetype)) {
                return next(new CustomError('Wrong file type!'));
            }
            next();
        } catch (e) {
            next(e);
        }
    },

};
