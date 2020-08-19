const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    details: {
      url: {
        type: String,
        required: false
      },
      width: {
        type: Number,
        required: false
      },
      height: {
        type: Number,
        required: false
      },
      type: {
        type: String,
        required: false
      }
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    fileSize: {
      type: Number,
      required: false
    },
    uploader: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Image', imageSchema)
