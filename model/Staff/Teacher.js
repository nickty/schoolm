const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const teacherSchema = new Schema(
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
    teacherId: {
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
    isWithrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'teacher',
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    applicationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    program: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
    },
    classLevel: {
      type: Schema.Types.ObjectId,
      ref: 'ClassLevel',
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicYear',
    },
    examsCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exam',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicTerm',
    },
  },
  { timestamps: true }
)

// hash password
teacherSchema.pre('save', async function (next) {
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
teacherSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher
