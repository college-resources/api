const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    sub: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    emailVerified: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    givenName: {
      type: String,
      required: true
    },
    familyName: {
      type: String,
      required: true
    },
    middleName: {
      type: String,
      required: false
    },
    nickname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    picture: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
