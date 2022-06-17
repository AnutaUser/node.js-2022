const CError = require('../error/CustomError');

module.exports = {
    checkUserOnCreate: (req, res, next) => {
        try {
            const {name = '', email = '', age = 0, password = ''} = req.body;

            if (!name || !email || !password) {
                throw new CError('Some field is missing!', 400);
            }
            if (password.length < 5) {
                throw new CError('Password should include at least 5 symbols!');
            }

            next();

        } catch (e) {
            next(e);
        }
    }
};
