const bcrypt = require('bcrypt');

module.exports = {
    hash_password: (password) => bcrypt.hash(password, 10),
    compare_password: (hash_password, password) => bcrypt.compare(hash_password, password),
};
