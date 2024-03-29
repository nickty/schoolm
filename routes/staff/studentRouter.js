const express = require('express')

const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  adminRegisterStudentController,
  loginStudentController,
  getStudnetProfile,
  getAllStudentController,
  getSingleStudentController,
  updateStudentController,
  adminUpdateStudentController,
  writeExamController,
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
studentRouter.get('/profiles', isLogin, isAdmin, getAllStudentController)
studentRouter.get(
  '/:studentID/admin',
  isLogin,
  isAdmin,
  getSingleStudentController
)
studentRouter.put(
  '/update',
  isStudentLoggedIn,
  isStudent,
  updateStudentController
)
studentRouter.post(
  '/exam/:examID/write',
  isStudentLoggedIn,
  isStudent,
  writeExamController
)
studentRouter.put(
  '/:studentID/update/admin',
  isLogin,
  isAdmin,
  adminUpdateStudentController
)

module.exports = studentRouter
