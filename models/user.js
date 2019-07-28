const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    sub: {
      type: String,
      required: true,
      unique: true
    },
    iss: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    email_verified: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    family_name: {
      type: String,
      required: false
    },
    given_name: {
      type: String,
      required: false
    },
    middle_name: {
      type: String,
      required: false
    },
    nickname: {
      type: String,
      required: false
    },
    preferred_username: {
      type: String,
      required: false
    },
    gender: {
      type: String,
      required: false
    },
    birthDate: {
      type: Date,
      required: false
    },
    picture: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
