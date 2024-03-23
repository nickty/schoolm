const Admin = require('../model/Staff/Admin')

const isAdmin = async (req, res, next) => {
  const userId = req?.userAuth?._id
  const adminFound = await Admin.findById(userId)

  if (adminFound?.role === 'admin') {
    next()
  } else {
    next(new Error('Access denied, admin only'))
  }
}

module.exports = isAdmin
