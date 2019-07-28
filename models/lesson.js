const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lessonSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    semester: {
      type: Number,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Lesson', lessonSchema)
