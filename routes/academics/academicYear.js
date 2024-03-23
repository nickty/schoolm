const express = require('express')
const {
  createAcademicYear,
  getAcademicYears,
  getAcademicYear,
  updateAcademicYear,
} = require('../../controller/academic/academicYearController')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')

const academicYearRouter = express.Router()

academicYearRouter.post('/', isLogin, isAdmin, createAcademicYear)
academicYearRouter.get('/', getAcademicYears)
academicYearRouter.get('/:id', isLogin, isAdmin, getAcademicYear)
academicYearRouter.put('/:id', isLogin, isAdmin, updateAcademicYear)

module.exports = academicYearRouter
