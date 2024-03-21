const express = require('express')

const adminRouter = express.Router()

adminRouter.post('/register', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin bas been registered',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'Adin bas been failed',
    })
  }
})

adminRouter.post('/login', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin logged in',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'admin logged in failed',
    })
  }
})
adminRouter.get('/all', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'All admins',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'all admin failed',
    })
  }
})

adminRouter.get('/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Single admins',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'falid single',
    })
  }
})

adminRouter.put('/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Update admin',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'update admin failed',
    })
  }
})

adminRouter.delete('/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'delete admin',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'letet admin failed',
    })
  }
})
adminRouter.put('/suspend/teacher/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'admin suspend teacher',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'letet admin failed',
    })
  }
})
adminRouter.put('/unsuspend/teacher/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'admin unsuspend teacher',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'letet admin failed',
    })
  }
})
adminRouter.put('/withdraw/teacher/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'admin withdraw teacher',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'letet admin failed',
    })
  }
})
adminRouter.put('/unwithdraw/teacher/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'admin unwithdraw teacher',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'letet admin failed',
    })
  }
})
adminRouter.put('/publish/exam/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'admin publish exam teacher',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'letet admin failed',
    })
  }
})
adminRouter.put('/unpublish/exam/:id', (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'admin unpublish exam teacher',
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'letet admin failed',
    })
  }
})

module.exports = adminRouter
