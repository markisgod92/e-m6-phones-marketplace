const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String, 
        required: true,
        min: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        required: true,
        default: 'https://picsum.photos/200/300'
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PhoneModel'
        }
    ],
    cart: [
        {
            phone: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PhoneModel',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ]
}, {
    timestamps: true,
    strict: true 
})

module.exports = mongoose.model('userModel', userSchema, 'users')