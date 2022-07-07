const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    age: {
        type: Number,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    avatar: String,

}, {timestamps: true});

module.exports = model('user', userSchema);
