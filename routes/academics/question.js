const express = require('express')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn')
const isTeacher = require('../../middlewares/isTeacher')
const {
  createQuestionController,
  getQuestionsController,
  getQuestion,
} = require('../../controller/academic/questionsController')

const questionRoute = express.Router()

questionRoute.post(
  '/:examID',
  isTeacherLoggedIn,
  isTeacher,
  createQuestionController
)
questionRoute.get('/', isTeacherLoggedIn, isTeacher, getQuestionsController)
questionRoute.get('/:id', isTeacherLoggedIn, isTeacher, getQuestion)
// questionRoute.put('/:id', isLogin, isAdmin, updateYearGroup)
// questionRoute.delete('/:id', isLogin, isAdmin, yearGroupDelete)

module.exports = questionRoute
