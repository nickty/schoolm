const express = require('express')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')
const {
  createYearGroup,
  getYearGroups,
  getYearGroup,
  updateYearGroup,
  yearGroupDelete,
} = require('../../controller/academic/yearGroupController')

const yearGroupRoute = express.Router()

yearGroupRoute.post('/', isLogin, isAdmin, createYearGroup)
yearGroupRoute.get('/', getYearGroups)
yearGroupRoute.get('/:id', isLogin, isAdmin, getYearGroup)
yearGroupRoute.put('/:id', isLogin, isAdmin, updateYearGroup)
yearGroupRoute.delete('/:id', isLogin, isAdmin, yearGroupDelete)

module.exports = yearGroupRoute
