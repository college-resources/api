const mongoose = require('mongoose')

const Schema = mongoose.Schema

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    institute: {
      type: String,
      required: true
    }
  }
)

module.exports = mongoose.model('Department', departmentSchema)
