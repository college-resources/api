const mongoose = require('mongoose')

const Schema = mongoose.Schema

const apiRequestSchema = new Schema(
  {
    nonce: {
      type: String,
      required: true,
      unique: true
    },
    callback: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    code: {
      type: String,
      required: false
    },
    completed: {
      type: Boolean,
      required: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('ApiRequest', apiRequestSchema)