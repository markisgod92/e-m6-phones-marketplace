const express = require('express')
const init = require('./db')
require('dotenv').config()

const PORT = 4040
const server = express()
server.use(express.json())

const phonesRoutes = require('./routes/phones')

server.use('/', phonesRoutes)

init()

server.listen(PORT, () => console.log('Server up and running.', PORT))