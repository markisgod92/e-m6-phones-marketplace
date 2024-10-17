const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    phoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'phoneModel',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    }
}, {
    timestamps: true,
    strict: true 
})

module.exports = mongoose.model('reviewModel', ReviewSchema, 'reviews')