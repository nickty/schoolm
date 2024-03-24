const express = require('express')
const {
  adminRegisterTeacherController,
  loginTeacherController,
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

module.exports = teacherRouter
