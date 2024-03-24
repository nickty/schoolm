const AsyncHandler = require('express-async-handler')
const Admin = require('../../model/Staff/Admin')
const Program = require('../../model/Academic/Program')
const Subject = require('../../model/Academic/Subject')
const YearGroup = require('../../model/Academic/YearGroup')

exports.createYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body

  console.log('first', name, academicYear)
  // find the program
  const yearGroupFound = await YearGroup.findOne({ name })
  //   check if exist
  if (yearGroupFound) {
    throw new Error('Year group already exist')
  }

  //   create
  const yearGroupCreated = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  })
  // find admin
  const admin = await Admin.findById(req.userAuth._id)
  if (!admin) {
    throw new Error('Admin not found')
  }
  //   push Subject to program
  admin.yearGroups.push(yearGroupCreated._id)
  // save
  await admin.save()

  res.status(201).json({
    status: 'sucess',
    message: 'Year group created successfully',
    data: yearGroupCreated,
  })
})

// get all
exports.getYearGroups = AsyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find()
  res.status(201).json({
    status: 'sucess',
    message: 'Year group fetched successfully',
    data: yearGroups,
  })
})

// get single
exports.getYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Year group fetched successfully',
    data: yearGroup,
  })
})

// update
exports.updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body
  const yearGroupFound = await YearGroup.findOne({ name })
  if (yearGroupFound) {
    throw new Error('Year group already exist')
  }
  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    { name, academicYear, createdBy: req.userAuth._id },
    { new: true }
  )
  res.status(201).json({
    status: 'sucess',
    message: 'Year updated successfully',
    data: yearGroup,
  })
})

// delete one
exports.yearGroupDelete = AsyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Year group deleted successfully',
  })
})
