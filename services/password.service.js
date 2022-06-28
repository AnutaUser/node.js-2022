const bcrypt = require('bcrypt');

const {CustomError} = require('../errors');

module.exports = {
    hash_password: (password) => bcrypt.hash(password, 10),
    compare_password: async (hash_password, password) => {
        const isPasswordSame = await bcrypt.compare(hash_password, password);
        if (!isPasswordSame) {
            return new CustomError('Wrong email or password!');
        }
    },
};
