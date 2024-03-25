const AsyncHandler = require('express-async-handler')
const Teacher = require('../../model/Staff/Teacher')
const Exam = require('../../model/Academic/Exam')

exports.createExamController = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    classLevel,
    duraion,
    examDate,
    examTime,
    academicYear,
    examType,
  } = req.body

  //   find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id)
  if (!teacherFound) {
    throw new Error('Teacher not found')
  }

  //   check exam with name
  const examExists = await Exam.findOne({ name })
  if (examExists) {
    throw new Error('Exam already exist')
  }

  const examCreated = await new Exam({
    name,
    description,
    academicTerm,
    classLevel,
    subject,
    program,
    duraion,
    examDate,
    examTime,
    createdBy: req.userAuth._id,
    academicYear,
    examType,
  })
  teacherFound.examsCreated.push(examCreated._id)
  await examCreated.save()
  await teacherFound.save()

  res.status(201).json({
    status: 'success',
    data: examCreated,
    message: 'Exam created sucessfully',
  })
})

// get all
exports.getExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find()
  res.status(201).json({
    status: 'success',
    message: 'Exams fetched successfully',
    data: exams,
  })
})

// get single
exports.getExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id)
  res.status(201).json({
    status: 'success',
    message: 'Exam fetched successfully',
    data: exam,
  })
})

// update
exports.updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    classLevel,
    duraion,
    examDate,
    examTime,
    academicYear,
    examType,
  } = req.body
  const examFound = await Exam.findOne({ name })
  if (examFound) {
    throw new Error('Academic year already exist')
  }
  const exam = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      classLevel,
      duraion,
      examDate,
      examTime,
      academicYear,
      examType,
    },
    { new: true }
  )
  res.status(201).json({
    status: 'success',
    message: 'Exam updated successfully',
    data: exam,
  })
})
