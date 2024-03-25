const Student = require('../model/Academic/Student')

const isStudent = async (req, res, next) => {
  const userId = req?.userAuth?._id
  const teacherFound = await Student.findById(userId)

  if (teacherFound?.role === 'student') {
    next()
  } else {
    next(new Error('Access denied, students only'))
  }
}

module.exports = isStudent
