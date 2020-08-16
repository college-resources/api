const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lessonNoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    examMonth: {
      type: Number,
      required: false
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Image'
      }
    ],
    hypertexts: [
      {
        type: String,
        required: true
      }
    ],
    lesson: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Lesson'
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('LessonNote', lessonNoteSchema)
