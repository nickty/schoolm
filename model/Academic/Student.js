const mongoose = require('mongoose')

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
            .toUppercase()
        )
      },
    },
    role: {
      type: String,
      default: 'student',
    },

    classLevels: {
      type: Schema.Types.ObjectId,
      ref: 'ClassLevel',
      required: true,
    },
    currentClassLevel: {
      type: String,
      default: function () {
        return this.classLevel[this.classLevels.length - 1]
      },
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicYear',
      required: true,
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
      required: true,
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
      type: String,
    },
  },
  { timestamps: true }
)

const Student = mongoose.model('Student', studentSchema)

module.exports = Student