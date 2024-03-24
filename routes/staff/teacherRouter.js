const express = require('express')
const {
  adminRegisterTeacherController,
  loginTeacherController,
  getAllTeacherController,
  getSingleTeacherController,
} = require('../../controller/staff/teacherController')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')

const teacherRouter = express.Router()

teacherRouter.post(
  '/admin/register',
  isLogin,
  isAdmin,
  adminRegisterTeacherController
)
teacherRouter.post('/login', loginTeacherController)
teacherRouter.get('/admin', isLogin, isAdmin, getAllTeacherController)
teacherRouter.get(
  '/:teacherID/admin',
  isLogin,
  isAdmin,
  getSingleTeacherController
)

module.exports = teacherRouter
