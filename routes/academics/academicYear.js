const express = require('express')
const {
  createAcademicYear,
  getAcademicYears,
  getAcademicYear,
} = require('../../controller/academic/academicYearController')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')

const academicYearRouter = express.Router()

academicYearRouter.post('/', isLogin, isAdmin, createAcademicYear)
academicYearRouter.get('/', getAcademicYears)
academicYearRouter.get('/:id', isLogin, isAdmin, getAcademicYear)

module.exports = academicYearRouter
