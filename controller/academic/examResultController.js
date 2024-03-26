const AsyncHandler = require('express-async-handler')
const Teacher = require('../../model/Staff/Teacher')
const Exam = require('../../model/Academic/Exam')
const ExamResult = require('../../model/Academic/ExamResults')

exports.checkExamResultController = AsyncHandler(async (req, res) => {
  res.json('checking results')
})

exports.getAllExamResultController = AsyncHandler(async (req, res) => {
  const results = await ExamResult.find()
  res.status(200).json({
    status: 'success',
    message: 'Exam results fetched',
    data: results,
  })
})
