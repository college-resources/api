const mongoose = require('mongoose')

const Schema = mongoose.Schema

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    institute: {
      type: Schema.Types.ObjectId,
      ref: 'Institute',
      required: true
    }
  }
)

module.exports = mongoose.model('Department', departmentSchema)
