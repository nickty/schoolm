const express = require('express')
const {
  adminRegisterTeacherController,
  loginTeacherController,
  getAllTeacherController,
  getSingleTeacherController,
  getTeacherProfile,
  updateTeacherController,
} = require('../../controller/staff/teacherController')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const isTeacher = require('../../middlewares/isTeacher')
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn')

const teacherRouter = express.Router()

teacherRouter.post(
  '/admin/register',
  isLogin,
  isAdmin,
  adminRegisterTeacherController
)
teacherRouter.post('/login', loginTeacherController)
teacherRouter.get('/admin', isLogin, isAdmin, getAllTeacherController)

teacherRouter.get('/profile', isTeacherLoggedIn, isTeacher, getTeacherProfile)
teacherRouter.put(
  '/:teacherID/update',
  isTeacherLoggedIn,
  isTeacher,
  updateTeacherController
)
teacherRouter.get(
  '/:teacherID/admin',
  isLogin,
  isAdmin,
  getSingleTeacherController
)

module.exports = teacherRouter
