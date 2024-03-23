const AsyncHandler = require('express-async-handler')

const Admin = require('../../model/Staff/Admin')
const AcademicTerm = require('../../model/Academic/AcademicTerm')

exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body
  //   check if exist
  const academicYear = await AcademicTerm.findOne({ name })
  if (academicYear) {
    throw new Error('Academic year already exist')
  }
  //   create
  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  })
  //   push acadmic year to adin
  const admin = await Admin.findById(req.userAuth._id)
  admin.academicTerms.push(academicTermCreated._id)
  admin.save()
  res.status(201).json({
    status: 'sucess',
    message: 'Academic term created successfully',
    data: academicTermCreated,
  })
})

// get all
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find()
  res.status(201).json({
    status: 'sucess',
    message: 'Academic term fetched successfully',
    data: academicTerms,
  })
})

// get single
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Academic term fetched successfully',
    data: academicTerm,
  })
})

// get single
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body
  const academicTermFound = await AcademicTerm.findOne({ name })
  if (academicTermFound) {
    throw new Error('Academic term already exist')
  }
  const academicYear = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    { name, description, duration, createdBy: req.userAuth._id },
    { new: true }
  )
  res.status(201).json({
    status: 'sucess',
    message: 'Academic term updated successfully',
    data: academicYear,
  })
})

// delete one
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Academic term deleted successfully',
  })
})
