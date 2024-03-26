const express = require('express')
const {
  checkExamResultController,
} = require('../../controller/academic/examResultController')

const examResultRoute = express.Router()

// examResultRoute.post('/', isTeacherLoggedIn, isTeacher, createExamController)
examResultRoute.get('/:id/checking', checkExamResultController)
// examResultRoute.get('/:id', getExam)
// examResultRoute.put('/:id', isTeacherLoggedIn, isTeacher, updateExam)
// examResultRoute.get('/:id', isLogin, isAdmin, getYearGroup)
// examResultRoute.put('/:id', isLogin, isAdmin, updateYearGroup)
// examResultRoute.delete('/:id', isLogin, isAdmin, yearGroupDelete)

module.exports = examResultRoute
