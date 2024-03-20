const mongoose = require('mongoose')
const dbConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://nickty:Nick126721@anything.rs1frok.mongodb.net/?retryWrites=true&w=majority&appName=anything'
    )
    console.log('DB connected successfully')
  } catch (error) {
    console.log('DB connection failed', error.message)
  }
}

dbConnect()
