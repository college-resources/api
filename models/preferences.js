const mongoose = require('mongoose')

const Schema = mongoose.Schema

const preferencesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    feeding: {
      type: Schema.Types.ObjectId,
      ref: 'Feeding',
      required: false
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: false
    },
    semester: {
      type: Number,
      required: false
    },
    courses: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    }],
    theme: {
      type: String,
      required: false
    }
  }
)

module.exports = mongoose.model('Preferences', preferencesSchema)
