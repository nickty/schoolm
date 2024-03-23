const express = require('express')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require('../../controller/academic/subjectController')

const subjectRoute = express.Router()

subjectRoute.post('/:programId', isLogin, isAdmin, createSubject)
subjectRoute.get('/', getSubjects)
subjectRoute.get('/:id', isLogin, isAdmin, getSubject)
subjectRoute.put('/:id', isLogin, isAdmin, updateSubject)
subjectRoute.delete('/:id', isLogin, isAdmin, deleteSubject)

module.exports = subjectRoute
