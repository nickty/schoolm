const express = require('express')
const morgan = require('morgan')
const adminRouter = require('../routes/staff/adminRouter')
const {
  globalErrHandler,
  notFoundErr,
} = require('../middlewares/globalErrorHandler')
const academicYearRouter = require('../routes/academics/academicYear')
const academicTermRouter = require('../routes/academics/academicTerm')

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
// admin routes
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/academic-years', academicYearRouter)
app.use('/api/v1/academic-terms', academicTermRouter)

// Error
app.use(notFoundErr)
app.use(globalErrHandler)

module.exports = app
