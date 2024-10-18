const express = require('express')
const mongoose = require('mongoose')
const reviews = express.Router()
const ReviewModel = require('../models/ReviewModel')


reviews.get('/reviews/:phoneId', async (req, res) => {
    const { phoneId } = req.params

    try {
        const reviews = await ReviewModel.find({ phoneId: phoneId })

        if(reviews.length === 0) {
            return res.status(404)
            .send({
                statusCode: 404,
                message: `No reviews for id ${phoneId}.`
            })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `Reviews found for ${phoneId}.`,
                reviews
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

reviews.post('/reviews', async (req, res) => {
    const newReview = new ReviewModel(req.body)

    try {
        const postedReview = await newReview.save()

        res.status(201)
            .send({
                statusCode: 201,
                message: 'Review posted.',
                postedReview
            })

    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})


module.exports = reviews