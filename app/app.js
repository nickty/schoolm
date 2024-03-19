const express = require('express')
const morgan = require('morgan')

const app = express()

//middlewares
app.use(morgan('dev'))

module.exports = app
