const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },

    age: {
        type: Number,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        require: true
    }
}, {timestamps: true});

module.exports = model('user', UserSchema);


