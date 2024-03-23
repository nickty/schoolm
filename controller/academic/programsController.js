const AsyncHandler = require('express-async-handler')
const Admin = require('../../model/Staff/Admin')
const Program = require('../../model/Academic/Program')

exports.createProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body
  //   check if exist
  const program = await Program.findOne({ name })
  if (program) {
    throw new Error('Program already exist')
  }
  //   create
  const ProgramCreated = await Program.create({
    name,
    description,
    createdBy: req.userAuth._id,
  })
  //   push program to adin
  const admin = await Admin.findById(req.userAuth._id)
  admin.programs.push(ProgramCreated._id)
  admin.save()
  res.status(201).json({
    status: 'sucess',
    message: 'Program created successfully',
    data: ProgramCreated,
  })
})

// get all
exports.getPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find()
  res.status(201).json({
    status: 'sucess',
    message: 'Programs fetched successfully',
    data: programs,
  })
})

// get single
exports.getProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Program fetched successfully',
    data: program,
  })
})

// update
exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body
  const ProgramFound = await Program.findOne({ name })
  if (ProgramFound) {
    throw new Error('Program already exist')
  }
  const program = await Program.findByIdAndUpdate(
    req.params.id,
    { name, description, createdBy: req.userAuth._id },
    { new: true }
  )
  res.status(201).json({
    status: 'sucess',
    message: 'Program updated successfully',
    data: program,
  })
})

// delete one
exports.deleteProgram = AsyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Program deleted successfully',
  })
})
