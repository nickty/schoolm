const express = require('express')
const morgan = require('morgan')
const adminRouter = require('../routes/staff/adminRouter')
const globalErrHandler = require('../middlewares/globalErrorHandler')

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
// admin routes
app.use('/api/v1/admin', adminRouter)

// Error middlewares
app.use(globalErrHandler)

module.exports = app
