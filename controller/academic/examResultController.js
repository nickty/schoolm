const AsyncHandler = require('express-async-handler')
const Teacher = require('../../model/Staff/Teacher')
const Exam = require('../../model/Academic/Exam')
const ExamResult = require('../../model/Academic/ExamResults')
const Student = require('../../model/Academic/Student')

exports.checkExamResultController = AsyncHandler(async (req, res) => {
  const studentFound = await Student.findById(req.userAuth?._id)

  if (!studentFound) {
    throw new Error('No student found')
  }

  const examResult = await ExamResult.findOne({
    studentID: studentFound?.studentId,
    _id: req.params.id,
  })
  //   check if exam is published
  if (examResult?.isPublished === false) {
    throw new Error('Exam result is not available, check out later')
  }

  res.status(200).json({
    status: 'success',
    message: 'Exam results fetched',
    data: examResult,
    student: studentFound,
  })
})

exports.getAllExamResultController = AsyncHandler(async (req, res) => {
  const results = await ExamResult.find()
  res.status(200).json({
    status: 'success',
    message: 'Exam results fetched',
    data: results,
  })
})
