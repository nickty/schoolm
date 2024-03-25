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
