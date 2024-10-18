const express = require('express')
const init = require('./db')
const cors = require('cors')
require('dotenv').config()

const PORT = 4040
const server = express()
server.use(cors())
server.use(express.json())

const phonesRoutes = require('./routes/phones')

server.use('/', phonesRoutes)

init()

server.listen(PORT, () => console.log('Server up and running.', PORT))