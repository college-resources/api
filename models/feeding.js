const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedingSchema = new Schema(
  {
    days: [
      {
        breakfast: {
          type: String
        },
        lunch: {
          type: String
        },
        dinner: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Feeding', feedingSchema)
