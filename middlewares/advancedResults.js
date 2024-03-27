// model, populate

const advancedResults = (model, populate) => {
  return async (req, res, next) => {
    console.log('response', res.myData)
    let TeachersQuery = model.find()
    // query string

    // convert query string
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 2
    const skip = (page - 1) * limit

    const startIndex = (page - 1) * limit
    const endIndext = page * limit

    // populate
    if (populate) {
      TeachersQuery = TeachersQuery.populate(populate)
    }

    // get total records
    const total = await model.countDocuments()

    if (req.query.name) {
      TeachersQuery = TeachersQuery.find({
        name: { $regex: req.query.name, $options: 'i' },
      })
    }

    // pagination result
    const pagination = {}
    // add next
    if (endIndext < total) {
      pagination.next = {
        page: page + 1,
        limit,
      }
    }
    // add prev
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      }
    }

    const teachers = await TeachersQuery.find().skip(skip).limit(limit)

    res.results = {
      status: 'success',
      message: 'Teachers fetched successfully',
      data: teachers,
      results: teachers.length,
      total,
      pagination,
    }

    next()
  }
}

module.exports = advancedResults
