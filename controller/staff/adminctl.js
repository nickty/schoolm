// Register admin
// Route Post /api/admin/register

const Admin = require('../../model/Staff/Admin')
const AsyncHandler = require('express-async-handler')
const generateToken = require('../../utils/generateToken')
const verifyToken = require('../../utils/verifyToken')

// Access private
exports.registerAdminController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // if email exist
  const adminFound = await Admin.findOne({ email })
  if (adminFound) {
    throw new Error('Admin exists')
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
})

exports.loginAdminController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  // find user
  const user = await Admin.findOne({ email })
  if (!user) {
    return res.json({ message: 'Invalid login credentials' })
  }
  if (user && (await user.verifyPassword(password))) {
    const token = generateToken(user._id)
    const verify = verifyToken(token)
    return res.json({ data: generateToken(user._id), user, verify })
  } else {
    return res.json({ message: 'Invalid login credentials' })
  }
})

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

exports.getSingleAdminController = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id).select('-password')
  if (!admin) {
    throw new Error('Admin not found')
  } else {
    res.status(200).json({
      status: 'success',
      data: admin,
    })
  }
})

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
