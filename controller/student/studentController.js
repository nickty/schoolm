const AsyncHandler = require('express-async-handler')
const Student = require('../../model/Academic/Student')
const generateToken = require('../../utils/generateToken')
const Exam = require('../../model/Academic/Exam')

// register student
exports.adminRegisterStudentController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  console.log('check', name, email, password)
  // if email exist
  const studentFound = await Student.findOne({ email })
  if (studentFound) {
    throw new Error('Student exists')
  }
  const user = await Student.create({
    name,
    email,
    password,
  })
  res.status(201).json({
    status: 'success',
    data: user,
    message: 'Student registered sucessfully',
  })
})

// login
exports.loginStudentController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  // find user
  const user = await Student.findOne({ email })
  if (!user) {
    return res.json({ message: 'Invalid login credentials' })
  }
  if (user && (await user.verifyPassword(password))) {
    return res.json({
      status: 'success',
      data: generateToken(user?._id),
      message: 'Student logged in successfully',
    })
  } else {
    return res.json({ message: 'Invalid login credentials' })
  }
})

exports.getStudnetProfile = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth?._id).select('-password')
  if (!student) {
    throw new Error('student not found')
  } else {
    res.status(200).json({
      status: 'success',
      data: student,
      message: 'student profile fetched successfully',
    })
  }
})

exports.getAllStudentController = AsyncHandler(async (req, res) => {
  const students = await Student.find()
  res.status(200).json({
    status: 'success',
    message: 'Student fetched successfully',
    data: students,
  })
})

exports.getSingleStudentController = AsyncHandler(async (req, res) => {
  const studentid = req.params.studentID

  const student = await Student.findById(studentid).select('-password')

  if (!student) {
    throw new Error('student not found')
  } else {
    res.status(200).json({
      status: 'success',
      data: student,
      message: 'Student profile fetched successfully',
    })
  }
})

exports.updateStudentController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body
  let studentFound = await Student.findById(req.userAuth._id)

  if (!studentFound) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Student not found' })
  }

  // Check if the new email belongs to another user
  const emailExist = await Student.findOne({
    email: email,
    _id: { $ne: req.userAuth._id },
  })
  if (emailExist) {
    throw new Error('This email is taken/exist')
  } else {
    // Set the new values on the found document
    // if (name) studentFound.name = name
    if (email) studentFound.email = email
    if (password) studentFound.password = password // This will be hashed in the pre-save middleware

    const updatedStudent = await studentFound.save() // This triggers pre-save hooks

    // Optionally, you might want to omit the password from the response
    updatedStudent.password = undefined

    res.status(200).json({
      status: 'success',
      data: updatedStudent,
      message: 'Student updated successfully',
    })
  }
})

// admin update student
exports.adminUpdateStudentController = AsyncHandler(async (req, res) => {
  const { classLevel, academicYear, program, name, email, prefectName } =
    req.body

  let studentFound = await Student.findById(req.params.studentID)

  if (!studentFound) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Student not found' })
  }

  // check teacher status
  if (studentFound.isWithrawn) {
    throw new Error('Student is withdrawn')
  }

  const studentUpdated = await Student.findByIdAndDelete(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        prefectName,
      },
      $addToSet: {
        classLevel,
      },
    },
    {
      new: true,
    }
  )

  res.status(200).json({
    status: 'success',
    data: studentUpdated,
    message: 'Student updated successfully',
  })
})

// student taking exam
exports.writeExamController = AsyncHandler(async (req, res) => {
  // student
  const studentFound = await Student.findById(req.userAuth._id)

  if (!studentFound) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Student not found' })
  }

  //get exam
  const examFound = await Exam.findById(req.params.examID).populate('questions')

  if (!examFound) {
    return res.status(404).json({ status: 'error', message: 'Exam not found' })
  }

  // get questions
  const questions = examFound?.questions
  // get students questions
  const studentAnswers = req.body.answers

  // check if answers all the questions
  if (studentAnswers.length !== questions.length) {
    throw new Error('You have not answered all the questions')
  }

  // build report object
  let correctAnswers = 0
  let wrongAnswers = 0
  let totalQuestions = 0
  let status = ''
  let grade = 0
  let score = 0
  let answeredQuestions = 0

  // check for answers
  for (let i = 0; i < questions.length; i++) {
    // find the question
    const question = questions[i]
    //  check if the anwer is correct
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswers++
      score++
      question.isCorrent = true
    } else {
      wrongAnswers++
    }
  }
  // calculae total questions
  grade = (correctAnswers / questions.length) * 100
  answeredQuestions = questions.map((q) => {
    return {
      question: q.question,
      correctAnswer: q.correctAnswer,
      isCorrent: q.isCorrent,
    }
  })

  if (grade >= 50) {
    status = 'Passed'
  } else {
    status = 'Failed'
  }
  res.status(200).json({
    status: 'success',
    correctAnswers,
    wrongAnswers,
    score,
    grade,
    answeredQuestions,
    status,
  })
})
