const AsyncHandler = require('express-async-handler')
const Exam = require('../../model/Academic/Exam')
const Question = require('../../model/Academic/Question')

exports.createQuestionController = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body
  //   check if exist
  const exam = await Exam.findById(req.params.examID)
  if (!exam) {
    throw new Error('Exam not exist')
  }
  // check if question exist
  const questionExist = await Question.findOne({ question })
  if (questionExist) {
    throw new Error('Question already exist')
  }
  //   create
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth._id,
  })
  //   push program to exam
  exam.questions.push(questionCreated?._id)
  await exam.save()
  res.status(201).json({
    status: 'success',
    message: 'Question created successfully',
    data: questionCreated,
  })
})

// get all
exports.getQuestionsController = AsyncHandler(async (req, res) => {
  const questions = await Question.find()
  res.status(201).json({
    status: 'sucess',
    message: 'Question fetched successfully',
    data: questions,
  })
})

// get single
exports.getQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Question fetched successfully',
    data: question,
  })
})
