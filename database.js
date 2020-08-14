const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)

module.exports = () => mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${
      process.env.MONGODB_CLUSTER
    }`
  )
