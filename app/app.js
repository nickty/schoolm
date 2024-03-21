const express = require('express')
const morgan = require('morgan')
const adminRouter = require('../routes/staff/adminRouter')

const app = express()

//middlewares
app.use(morgan('dev'))

// Routes
// admin routes
app.use('/api/v1/admin', adminRouter)

module.exports = app
