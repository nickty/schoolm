const AsyncHandler = require('express-async-handler')
const Admin = require('../../model/Staff/Admin')
const ClassLevel = require('../../model/Academic/ClassLevel')

exports.createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body
  //   check if exist
  const classLevel = await ClassLevel.findOne({ name })
  if (classLevel) {
    throw new Error('Class level already exist')
  }
  //   create
  const classLevelCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  })
  //   push acadmic year to adin
  const admin = await Admin.findById(req.userAuth._id)
  admin.classLevel.push(classLevelCreated._id)
  admin.save()
  res.status(201).json({
    status: 'sucess',
    message: 'Class level created successfully',
    data: classLevelCreated,
  })
})

// get all
exports.getClassLevels = AsyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find()
  res.status(201).json({
    status: 'sucess',
    message: 'Class levels fetched successfully',
    data: classLevels,
  })
})

// get single
exports.getClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Class level fetched successfully',
    data: classLevel,
  })
})

// update
exports.updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body
  const classLevelFound = await ClassLevel.findOne({ name })
  if (classLevelFound) {
    throw new Error('Class level already exist')
  }
  const classLevel = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    { name, description, createdBy: req.userAuth._id },
    { new: true }
  )
  res.status(201).json({
    status: 'sucess',
    message: 'Class level updated successfully',
    data: classLevel,
  })
})

// delete one
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id)
  res.status(201).json({
    status: 'sucess',
    message: 'Class level deleted successfully',
  })
})
