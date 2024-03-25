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
