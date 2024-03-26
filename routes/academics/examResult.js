const express = require('express')
const {
  checkExamResultController,
  getAllExamResultController,
} = require('../../controller/academic/examResultController')
const isStudentLoggedIn = require('../../middlewares/isStudentLoggedIn')
const isStudent = require('../../middlewares/isStudent')

const examResultRoute = express.Router()

// examResultRoute.post('/', isTeacherLoggedIn, isTeacher, createExamController)
examResultRoute.get(
  '/:id/checking',
  isStudentLoggedIn,
  isStudent,
  checkExamResultController
)
examResultRoute.get(
  '/',
  isStudentLoggedIn,
  isStudent,
  getAllExamResultController
)
// examResultRoute.put('/:id', isTeacherLoggedIn, isTeacher, updateExam)
// examResultRoute.get('/:id', isLogin, isAdmin, getYearGroup)
// examResultRoute.put('/:id', isLogin, isAdmin, updateYearGroup)
// examResultRoute.delete('/:id', isLogin, isAdmin, yearGroupDelete)

module.exports = examResultRoute
