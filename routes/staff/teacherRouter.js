const express = require('express')
const {
  adminRegisterTeacherController,
  loginTeacherController,
  getAllTeacherController,
  getSingleTeacherController,
  getTeacherProfile,
  updateTeacherController,
  adminUpdateTeacherController,
} = require('../../controller/staff/teacherController')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const isTeacher = require('../../middlewares/isTeacher')
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn')
const advancedResults = require('../../middlewares/advancedResults')
const Teacher = require('../../model/Staff/Teacher')

const teacherRouter = express.Router()

teacherRouter.post(
  '/admin/register',
  isLogin,
  isAdmin,
  adminRegisterTeacherController
)
teacherRouter.post('/login', loginTeacherController)

teacherRouter.get(
  '/admin',
  isLogin,
  isAdmin,
  advancedResults(Teacher, 'examsCreated'),
  getAllTeacherController
)

teacherRouter.get('/profile', isTeacherLoggedIn, isTeacher, getTeacherProfile)
teacherRouter.put(
  '/:teacherID/update',
  isTeacherLoggedIn,
  isTeacher,
  updateTeacherController
)
teacherRouter.put(
  '/:teacherID/update/admin',
  isLogin,
  isAdmin,
  adminUpdateTeacherController
)
teacherRouter.get(
  '/:teacherID/admin',
  isLogin,
  isAdmin,
  getSingleTeacherController
)

module.exports = teacherRouter
