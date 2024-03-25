const express = require('express')

const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  adminRegisterStudentController,
  loginStudentController,
  getStudnetProfile,
} = require('../../controller/student/studentController')
const isStudentLoggedIn = require('../../middlewares/isStudentLoggedIn')
const isStudent = require('../../middlewares/isStudent')

const studentRouter = express.Router()

studentRouter.post(
  '/admin/register',
  isLogin,
  isAdmin,
  adminRegisterStudentController
)
studentRouter.post('/login', loginStudentController)
studentRouter.get('/profile', isStudentLoggedIn, isStudent, getStudnetProfile)

module.exports = studentRouter
