// Register admin
// Route Post /api/admin/register

const Admin = require('../../model/Staff/Admin')

// Access private
exports.registerAdminController = async (req, res) => {
  const { name, email, password } = req.body
  try {
    // if email exist
    const adminFound = await Admin.findOne({ email })
    if (adminFound) {
      res.json('Admin Exists')
    }
    const user = await Admin.create({
      name,
      email,
      password,
    })
    res.status(201).json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    res.status(201).json({
      status: 'failed',
      data: 'Adin bas been failed',
    })
  }
}

exports.loginAdminController = (req, res) => {
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
}

exports.getAllAdminController = (req, res) => {
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
}

exports.getSingleAdminController = (req, res) => {
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
}

exports.updateAdminController = (req, res) => {
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
}

exports.deleteAdminController = (req, res) => {
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
}

exports.suspendTeacherController = (req, res) => {
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
}

exports.unsuspendTeacherController = (req, res) => {
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
}

exports.withdrawTeacherController = (req, res) => {
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
}

exports.unWithdrawTeacherController = (req, res) => {
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
}

exports.publishExamController = (req, res) => {
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
}

exports.unPublishExamController = (req, res) => {
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
}
