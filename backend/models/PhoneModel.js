const mongoose = require('mongoose')

const PhoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String, 
        required: true
    },
    model: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    storageCapacity: {
        type: Number,
        required: true
    },
    color: {
        type: String, 
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String, 
        enum: ['new', 'like_new', 'used']
    },
    available: {
        type: Boolean, 
        default: true
    }
}, {
    timestamps: true,
    strict: true 
})

module.exports = mongoose.model('phoneModel', PhoneSchema, 'phones')