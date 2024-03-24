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

exports.getAllTeacherController = AsyncHandler(async (req, res) => {
  console.log('first')
  const teachers = await Teacher.find()
  res.status(200).json({
    status: 'success',
    message: 'Teachers fetched successfully',
    data: teachers,
  })
})

exports.getSingleTeacherController = AsyncHandler(async (req, res) => {
  const teacherID = req.params.teacherID

  const teacher = await Teacher.findById(teacherID)
  if (!teacher) {
    throw new Error('teacher not found')
  } else {
    res.status(200).json({
      status: 'success',
      data: teacher,
      message: 'teacher profile fetched successfully',
    })
  }
})

exports.getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth?._id).select('-password')
  if (!teacher) {
    throw new Error('teacher not found')
  } else {
    res.status(200).json({
      status: 'success',
      data: teacher,
      message: 'Teacher profile fetched successfully',
    })
  }
})

exports.updateTeacherController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  let adminFound = await Teacher.findById(req.userAuth._id)

  if (!adminFound) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Teacher not found' })
  }

  // Check if the new email belongs to another user
  const emailExist = await Teacher.findOne({
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

    const updatedTeacher = await adminFound.save() // This triggers pre-save hooks

    // Optionally, you might want to omit the password from the response
    updatedTeacher.password = undefined

    res.status(200).json({
      status: 'success',
      data: updatedTeacher,
      message: 'Teacher updated successfully',
    })
  }
})
