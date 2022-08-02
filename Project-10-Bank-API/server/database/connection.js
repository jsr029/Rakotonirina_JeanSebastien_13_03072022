const mongoose = require('mongoose')
const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB'
module.exports = async () => {
  await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(() => {
      console.log('Database successfully connected')
    })
    .catch((error) => {
      console.error(`Database Connectivity Error: ${error}`)
      throw new Error(error)
    })
}
