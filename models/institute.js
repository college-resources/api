const mongoose = require('mongoose')

const Schema = mongoose.Schema

const instituteSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    acronym: {
      type: String,
      required: true
    },
    courses: [{
      type: Schema.Types.ObjectId,
      ref: 'Feeding',
      required: true
    }]
  }
)

module.exports = mongoose.model('Institute', instituteSchema)