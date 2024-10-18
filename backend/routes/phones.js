const express = require('express')
const phones = express.Router()
const PhoneModel = require('../models/PhoneModel')

const makeFilter = (query) => {
    const { brand, priceMin, priceMax, condition } = query;
    const filter = {};

    if (brand) {
        filter.brand = brand;
    }

    if (condition) {
        filter.condition = condition;
    }

    if (priceMin) {
        filter.price = { ...filter.price, $gte: priceMin };
    }

    if (priceMax) {
        filter.price = { ...filter.price, $lte: priceMax };
    }

    return filter;
};

phones.get('/phones', async (req, res) => {
    const filter = makeFilter(req.query)
    const { page = 1, limit = 10 } = req.query

    try {
        const response = await PhoneModel.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)

        if (response.length === 0) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: 'no_phones_found'
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: 'Phones found.',
                response
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

phones.get('/phone/:phoneId', async (req, res) => {
    const { phoneId } = req.params

    try {
        const phone = await PhoneModel.findById(phoneId)

        if (!phone) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: `Phone with ID ${phoneId} not found.`
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `Phone with ID ${phoneId} found.`,
                phone
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

phones.post('/phone', async (req, res) => {
    const newPhone = new PhoneModel(req.body)

    try {
        const result = await newPhone.save()

        res.status(201)
            .send({
                statusCode: 201,
                message: 'Phone added to database.',
                result
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

phones.patch('/phone/:phoneId', async (req, res) => {
    const { phoneId } = req.params
    const phoneExists = await PhoneModel.findById(phoneId)

    if(!phoneExists) {
        return res.status(400)
            .send({
                statusCode: 400,
                message: `Phone with ID ${phoneId} not found.`
            })
    }

    try {
        const updatedPhoneData = req.body
        const options = { new: true }

        const result = await PhoneModel.findByIdAndUpdate(phoneId, updatedPhoneData, options)

        res.status(200)
            .send({
                statusCode: 200,
                message: `${phoneId} updated successfully.`,
                result
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

phones.delete('/phone/:phoneId', async (req, res) => {
    const { phoneId } = req.params

    try {
        const result = await PhoneModel.findByIdAndDelete(phoneId)

        if(!result) {
            return res.status(404).send({
                statusCode: 404,
                message: `${phoneId} not found.`
            });
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `${phoneId} deleted.`
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

module.exports = phones