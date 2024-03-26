const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const studentSchema = new Schema(
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
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
    studentId: {
      type: String,
      required: true,
      default: function () {
        return (
          'TEA' +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(' ')
            .map((name) => name[0])
            .join('')
            .toUpperCase()
        )
      },
    },
    role: {
      type: String,
      default: 'student',
    },
    classLevels: [
      {
        type: String,
      },
    ],
    currentClassLevel: {
      type: String,
      default: function () {
        return this.classLevels[this.classLevels.length - 1]
      },
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicYear',
    },
    dateAdmitted: {
      type: Date,
      default: Date.now,
    },
    examResults: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ExamResult',
      },
    ],
    program: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
    },
    isPromottedToLevel200: {
      type: Boolean,
      default: false,
    },
    isPromottedToLevel300: {
      type: Boolean,
      default: false,
    },
    isPromottedToLevel400: {
      type: Boolean,
      default: false,
    },
    isGraduated: {
      type: Boolean,
      default: false,
    },
    isWithrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    prefectName: {
      type: String,
    },
    yearGraduated: {
      type: Date,
    },
  },
  { timestamps: true }
)

// hash password
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // If password is not modified, move to the next middleware
    return next()
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10)
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt)
    next() // Move to the next middleware
  } catch (error) {
    next(error) // Pass any error to the next middleware
  }
})

// verify password
studentSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student
