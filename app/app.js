const express = require('express')
const morgan = require('morgan')
const adminRouter = require('../routes/staff/adminRouter')

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
// admin routes
app.use('/api/v1/admin', adminRouter)

// Error middlewares
app.use((err, req, res, next) => {
  //   status
  // message
  // stack
  const stack = err.stack
  const message = err.message
  const status = err.status ? err.status : 'failed'
  const statusCode = err.statusCode ? err.statusCode : 500
  res.status(statusCode).json({
    status,
    message,
    stack,
  })
})

module.exports = app
