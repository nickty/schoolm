const AsyncHandler = require('express-async-handler')
const Student = require('../../model/Academic/Student')
const generateToken = require('../../utils/generateToken')

// register teacher
exports.adminRegisterStudentController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  console.log('check', name, email, password)
  // if email exist
  const studentFound = await Student.findOne({ email })
  if (studentFound) {
    throw new Error('Student exists')
  }
  const user = await Student.create({
    name,
    email,
    password,
  })
  res.status(201).json({
    status: 'success',
    data: user,
    message: 'Student registered sucessfully',
  })
})

// login
exports.loginStudentController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  // find user
  const user = await Student.findOne({ email })
  if (!user) {
    return res.json({ message: 'Invalid login credentials' })
  }
  if (user && (await user.verifyPassword(password))) {
    return res.json({
      status: 'success',
      data: generateToken(user?._id),
      message: 'Student logged in successfully',
    })
  } else {
    return res.json({ message: 'Invalid login credentials' })
  }
})

exports.getStudnetProfile = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth?._id).select('-password')
  if (!student) {
    throw new Error('student not found')
  } else {
    res.status(200).json({
      status: 'success',
      data: student,
      message: 'student profile fetched successfully',
    })
  }
})

exports.getAllStudentController = AsyncHandler(async (req, res) => {
  const students = await Student.find()
  res.status(200).json({
    status: 'success',
    message: 'Student fetched successfully',
    data: students,
  })
})
