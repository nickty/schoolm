const express = require('express')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  createProgram,
  getPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
} = require('../../controller/academic/programsController')

const programRoute = express.Router()

programRoute.post('/', isLogin, isAdmin, createProgram)
programRoute.get('/', getPrograms)
programRoute.get('/:id', isLogin, isAdmin, getProgram)
programRoute.put('/:id', isLogin, isAdmin, updateProgram)
programRoute.delete('/:id', isLogin, isAdmin, deleteProgram)

module.exports = programRoute
