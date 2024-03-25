const express = require('express')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  createExamController,
  getExams,
} = require('../../controller/academic/examController')
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn')
const isTeacher = require('../../middlewares/isTeacher')

const examRoute = express.Router()

examRoute.post('/', isTeacherLoggedIn, isTeacher, createExamController)
examRoute.get('/', getExams)
// examRoute.get('/:id', isLogin, isAdmin, getYearGroup)
// examRoute.put('/:id', isLogin, isAdmin, updateYearGroup)
// examRoute.delete('/:id', isLogin, isAdmin, yearGroupDelete)

module.exports = examRoute
