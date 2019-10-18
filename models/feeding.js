const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedingSchema = new Schema(
  {
    weeks: [{
      days: [{
        meals: [{
          timeStart: {
            type: Number,
            required: true
          },
          timeEnd: {
            type: Number,
            required: true
          },
          menu: {
            type: String,
            required: true
          }
        }]
      }]
    }],
    name: {
      type: String,
      required: true
    },
    startsFrom: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Feeding', feedingSchema)
