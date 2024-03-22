const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
    academicTerms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicTerm',
      },
    ],
    academicYear: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicYear',
      },
    ],
    classLevel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassLevel',
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  { timestamps: true }
)

// hash password
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  // salt
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// verify password
adminSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
