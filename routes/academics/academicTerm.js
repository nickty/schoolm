const express = require('express')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  createAcademicTerm,
  getAcademicTerm,
  getAcademicTerms,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require('../../controller/academic/academicTermController')

const academicTermRouter = express.Router()

academicTermRouter.post('/', isLogin, isAdmin, createAcademicTerm)
academicTermRouter.get('/', getAcademicTerms)
academicTermRouter.get('/:id', isLogin, isAdmin, getAcademicTerm)
academicTermRouter.put('/:id', isLogin, isAdmin, updateAcademicTerm)
academicTermRouter.delete('/:id', isLogin, isAdmin, deleteAcademicTerm)

module.exports = academicTermRouter
