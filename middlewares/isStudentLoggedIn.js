const Student = require('../model/Academic/Student')
const verifyToken = require('../utils/verifyToken')

const isStudentLoggedIn = async (req, res, next) => {
  try {
    // Get token from header
    const headerObj = req.headers
    const token = headerObj?.authorization?.split(' ')[1]

    if (!token) {
      throw new Error('No token provided')
    }

    // Verify the token
    const verifiedToken = verifyToken(token)

    if (!verifiedToken) {
      throw new Error('Token expired or invalid')
    }

    // Find the admin
    const user = await Student.findById(verifiedToken.id).select(
      'name email role'
    )

    if (user) {
      // Save the user into req object
      req.userAuth = user
      next()
    } else {
      throw new Error('Student not found')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = isStudentLoggedIn
