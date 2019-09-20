const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    // Auth0 sub
    sub: {
      type: String,
      required: true,
      unique: true
    },
    // Auth0 email
    email: {
      type: String,
      required: true
    },
    // Auth0 email_verified
    emailVerified: {
      type: Boolean,
      required: true
    },
    // User name
    name: {
      type: String,
      required: true
    },
    // User first name
    givenName: {
      type: String,
      required: true
    },
    // User last name
    familyName: {
      type: String,
      required: true
    },
    // User birth date
    birthDate: {
      type: Date,
      required: false
    },
    // Path to user picture
    picture: {
      type: String,
      required: true
    },
    // User department
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
