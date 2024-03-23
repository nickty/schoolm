const AsyncHandler = require('express-async-handler')
const Admin = require('../../model/Staff/Admin')
const Program = require('../../model/Academic/Program')
const Subject = require('../../model/Academic/Subject')

exports.createSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body
  // find the program
  const programFound = await Program.findById(req.params.programId)
  //   check if exist
  if (!programFound) {
    throw new Error('Program not found')
  }
  const subject = await Subject.findOne({ name })
  if (subject) {
    throw new Error('Subject already exist')
  }
  //   create
  const SubjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  })
  //   push Subject to program
  programFound.subject.push(SubjectCreated._id)
  // save
  await programFound.save()

  res.status(201).json({
    status: 'sucess',
    message: 'Subject created successfully',
    data: SubjectCreated,
  })
})

// get all
exports.getSubjects = AsyncHandler(async (req, res) => {
  const subjects = await Subject.find()
  res.status(201).json({
    status: 'sucess',
    message: 'Subjects fetched successfully',
    data: subjects,
  })
})

// get single
exports.getSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Subject fetched successfully',
    data: subject,
  })
})

// update
exports.updateSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body
  const SubjectFound = await Subject.findOne({ name })
  if (SubjectFound) {
    throw new Error('Subject already exist')
  }
  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    { name, description, academicTerm, createdBy: req.userAuth._id },
    { new: true }
  )
  res.status(201).json({
    status: 'sucess',
    message: 'Subject updated successfully',
    data: subject,
  })
})

// delete one
exports.deleteSubject = AsyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Subject deleted successfully',
  })
})
