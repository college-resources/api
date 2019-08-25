const logger = require('../../modules/logger')
const Feeding = require('../../models/feeding')

const { transformData } = require('./helpers')

module.exports.feeding = async (_, args, req) => {
  try {
    const feeding = await Feeding.find().sort({ createdAt: 'desc' })
    return feeding.map(transformData)
  } catch (err) {
    logger(err)
  }
}

module.exports.addFeeding = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const feeding = new Feeding({
      days: [...Array(7)].map((_, i) => ({
        breakfast: args.feeding.days[i].breakfast,
        lunch: args.feeding.days[i].lunch,
        dinner: args.feeding.days[i].dinner
      }))
    })

    const result = await feeding.save()
    return transformData(result)
  } catch (err) {
    logger(err)
  }
}
