const {User} = require('../dataBase');

module.exports = {

    getAll: async (params = {}) => {
        return User.find(params);
    },

    createOne: async (user) => {
        return User.create(user);
    },

    getOne: async (params = {}) => {
        return User.findOne(params);
    },

    updateOne: async (params, dataUser, options= {new: true}) => {
        return User.findOneAndUpdate(params, dataUser, options);
    },

    deleteOne: async (params = {}) => {
        return User.deleteOne(params);
    },

};
