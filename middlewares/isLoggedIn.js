const Admin = require('../model/Staff/Admin')
const verifyToken = require('../utils/verifyToken')

const isLogin = async (req, res, next) => {
  //  get token from header
  const headerObj = req.headers
  const token = headerObj.authorization.split(' ')[1]
  // verify the token
  const verifiedToken = verifyToken(token)
  //   find the admin
  const user = await Admin.findById(verifiedToken.id).select('name email role')
  if (verifiedToken) {
    // save the user into req object
    req.userAuth = user
    next()
  } else {
    const err = new Error('token expired or invalid')
    next(err)
  }
}

module.exports = isLogin
