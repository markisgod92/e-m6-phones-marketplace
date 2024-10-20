const express = require('express')
const mongoose = require('mongoose')
const users = express.Router()
const UserModel = require('../models/UserModel')

users.get('/user/:userId', async (req, res) => {
    const {userId} = req.params

    try {
        const user = await UserModel.findById(userId)

        if(!user) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: `User with ID ${userId} not found.`
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `User with ID ${userId} found.`,
                user
            })

    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

users.get('/check-user', async (req, res) => {
    const [key, value] = Object.entries(req.query)[0]
    
    try {
        const user = await UserModel.findOne({ [key]: value })

        if(user) {
            return res.status(409)
                .send({
                    statusCode: 409,
                    message: `${key} not unique.`,
                    isUnique: false
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                isUnique: true
            })

    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

users.post('/user/create', async (req, res) => {
    const newUser = new UserModel(req.body)

    try {
        const result = await newUser.save()

        res.status(201)
            .send({
                statusCode: 201,
                message: 'User registered.',
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

users.post('/login', async (req, res) => {
    const {username, password} = req.body

    try {
        const userFound = await UserModel.findOne({username: username})

        if(!userFound) {
            return res.status(400)
                .send({
                    statusCode: 400,
                    message: 'User not found.'
                })
        }

        const passwordMatches = userFound.password === password

        if(!passwordMatches) {
            return res.status(401)
                .send({
                    statusCode: 401,
                    message: 'Incorrect password.'
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: 'Login successfull',
                userFound
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error.message
            })
    }
})

module.exports = users