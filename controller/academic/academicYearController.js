const AsyncHandler = require('express-async-handler')
const AcademicYear = require('../../model/Academic/AcademicYear')

exports.createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body
  //   check if exist
  const academicYear = await AcademicYear.findOne({ name })
  if (academicYear) {
    throw new Error('Academic year already exist')
  }
  //   create
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  })
  res.status(201).json({
    status: 'sucess',
    message: 'Academic year created successfully',
    data: academicYearCreated,
  })
})

// get all
exports.getAcademicYears = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find()
  res.status(201).json({
    status: 'sucess',
    message: 'Academic year fetched successfully',
    data: academicYears,
  })
})

// get single
exports.getAcademicYear = AsyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Academic year fetched successfully',
    data: academicYear,
  })
})

// get single
exports.updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body
  const academicYearFound = await AcademicYear.findOne({ name })
  if (academicYearFound) {
    throw new Error('Academic year already exist')
  }
  const academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    { name, fromYear, toYear, createdBy: req.userAuth._id },
    { new: true }
  )
  res.status(201).json({
    status: 'sucess',
    message: 'Academic year updated successfully',
    data: academicYear,
  })
})
