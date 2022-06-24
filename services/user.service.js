const {User} = require('../dataBase');

module.exports = {

    findAll: async (params = {}) => {
        return User.find(params);
    },

    createOne: async (user) => {
        return User.create(user);
    },

    findOne: async (params = {}) => {
        return User.findOne(params);
    },

    updateOne: async (params, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },

    deleteOne: async (params = {}) => {
        return User.deleteOne(params);
    }

};
