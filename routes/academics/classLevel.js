const express = require('express')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  createClassLevel,
  getClassLevels,
  getClassLevel,
  updateClassLevel,
  deleteClassLevel,
} = require('../../controller/academic/classLevelController')

const classLevelRouter = express.Router()

classLevelRouter.post('/', isLogin, isAdmin, createClassLevel)
classLevelRouter.get('/', getClassLevels)
classLevelRouter.get('/:id', isLogin, isAdmin, getClassLevel)
classLevelRouter.put('/:id', isLogin, isAdmin, updateClassLevel)
classLevelRouter.delete('/:id', isLogin, isAdmin, deleteClassLevel)

module.exports = classLevelRouter
