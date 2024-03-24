const expressAsyncHandler = require('express-async-handler')
const Teacher = require('../../model/Staff/Teacher')

// register teacher
exports.adminRegisterTeacherController = expressAsyncHandler(
  async (req, res) => {
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
  }
)
