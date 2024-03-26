const AsyncHandler = require('express-async-handler')
const Teacher = require('../../model/Staff/Teacher')
const Exam = require('../../model/Academic/Exam')

exports.checkExamResultController = AsyncHandler(async (req, res) => {
  res.json('checking results')
})
