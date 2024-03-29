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
    message: 'Admin registered sucessfully',
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
    return res.json({
      data: generateToken(user._id),
      message: 'Admin logged in successfully',
    })
  } else {
    return res.json({ message: 'Invalid login credentials' })
  }
})

exports.getAllAdminController = AsyncHandler(async (req, res) => {
  const admins = await Admin.find()
  res.status(200).json({
    status: 'success',
    message: 'Admin fetched successfully',
    data: admins,
  })
})

exports.getSingleAdminController = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id)
    .select('-password')
    .populate('academicYear')
  if (!admin) {
    throw new Error('Admin not found')
  } else {
    res.status(200).json({
      status: 'success',
      data: admin,
      message: 'Admin profile fetched successfully',
    })
  }
})

exports.updateAdminController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  let adminFound = await Admin.findById(req.userAuth._id)

  if (!adminFound) {
    return res.status(404).json({ status: 'error', message: 'Admin not found' })
  }

  // Check if the new email belongs to another user
  const emailExist = await Admin.findOne({
    email: email,
    _id: { $ne: req.userAuth._id },
  })
  if (emailExist) {
    throw new Error('This email is taken/exist')
  } else {
    // Set the new values on the found document
    if (name) adminFound.name = name
    if (email) adminFound.email = email
    if (password) adminFound.password = password // This will be hashed in the pre-save middleware

    const updatedAdmin = await adminFound.save() // This triggers pre-save hooks

    // Optionally, you might want to omit the password from the response
    updatedAdmin.password = undefined

    res.status(200).json({
      status: 'success',
      data: updatedAdmin,
      message: 'Admin updated successfully',
    })
  }
})
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
