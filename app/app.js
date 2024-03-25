const express = require('express')
const morgan = require('morgan')
const adminRouter = require('../routes/staff/adminRouter')
const {
  globalErrHandler,
  notFoundErr,
} = require('../middlewares/globalErrorHandler')
const academicYearRouter = require('../routes/academics/academicYear')
const academicTermRouter = require('../routes/academics/academicTerm')
const classLevelRouter = require('../routes/academics/classLevel')
const programRoute = require('../routes/academics/program')
const subjectRoute = require('../routes/academics/subject')
const yearGroupRoute = require('../routes/academics/yearGroup')
const teacherRouter = require('../routes/staff/teacherRouter')
const examRoute = require('../routes/academics/exam')

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
// admin routes
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/academic-years', academicYearRouter)
app.use('/api/v1/academic-terms', academicTermRouter)
app.use('/api/v1/class-levels', classLevelRouter)
app.use('/api/v1/programs', programRoute)
app.use('/api/v1/subjects', subjectRoute)
app.use('/api/v1/year-groups', yearGroupRoute)
app.use('/api/v1/teachers', teacherRouter)
app.use('/api/v1/exams', examRoute)

// Error
app.use(notFoundErr)
app.use(globalErrHandler)

module.exports = app
