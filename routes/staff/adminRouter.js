const express = require('express')
const {
  registerAdminController,
  loginAdminController,
  getAllAdminController,
  getSingleAdminController,
  updateAdminController,
  deleteAdminController,
  suspendTeacherController,
  unsuspendTeacherController,
  withdrawTeacherController,
  unWithdrawTeacherController,
  publishExamController,
  unPublishExamController,
} = require('../../controller/staff/adminctl')
const isLogin = require('../../middlewares/isLoggedIn')
const isAdmin = require('../../middlewares/isAdmin')

const adminRouter = express.Router()

adminRouter.post('/register', registerAdminController)
adminRouter.post('/login', loginAdminController)
adminRouter.get('/all', isLogin, getAllAdminController)
adminRouter.get('/', isLogin, isAdmin, getSingleAdminController)
adminRouter.put('/', isLogin, isAdmin, updateAdminController)
adminRouter.delete('/:id', deleteAdminController)
adminRouter.put('/suspend/teacher/:id', suspendTeacherController)
adminRouter.put('/unsuspend/teacher/:id', unsuspendTeacherController)
adminRouter.put('/withdraw/teacher/:id', withdrawTeacherController)
adminRouter.put('/unwithdraw/teacher/:id', unWithdrawTeacherController)
adminRouter.put('/publish/exam/:id', publishExamController)
adminRouter.put('/unpublish/exam/:id', unPublishExamController)

module.exports = adminRouter
