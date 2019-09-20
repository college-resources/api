const mongoose = require('mongoose')

const Schema = mongoose.Schema

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    institute: {
      type: String
      // TODO: Implement institute collection
      // required: true
    }
  }
)

module.exports = mongoose.model('Department', departmentSchema)
