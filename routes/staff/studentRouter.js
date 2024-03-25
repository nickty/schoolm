const express = require('express')

const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  adminRegisterStudentController,
} = require('../../controller/student/studentController')

const studentRouter = express.Router()

studentRouter.post(
  '/admin/register',
  isLogin,
  isAdmin,
  adminRegisterStudentController
)

module.exports = studentRouter
