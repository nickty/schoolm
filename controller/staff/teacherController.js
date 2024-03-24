const AsyncHandler = require('express-async-handler')
const Teacher = require('../../model/Staff/Teacher')
const generateToken = require('../../utils/generateToken')

// register teacher
exports.adminRegisterTeacherController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // if email exist
  const teacherFound = await Teacher.findOne({ email })
  if (teacherFound) {
    throw new Error('Teacher exists')
  }
  const user = await Teacher.create({
    name,
    email,
    password,
  })
  res.status(201).json({
    status: 'success',
    data: user,
    message: 'Teacher registered sucessfully',
  })
})

// login
exports.loginTeacherController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  // find user
  const user = await Teacher.findOne({ email })
  if (!user) {
    return res.json({ message: 'Invalid login credentials' })
  }
  if (user && (await user.verifyPassword(password))) {
    return res.json({
      status: 'success',
      data: generateToken(user?._id),
      message: 'Teacher logged in successfully',
    })
  } else {
    return res.json({ message: 'Invalid login credentials' })
  }
})