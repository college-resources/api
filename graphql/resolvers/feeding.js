const logger = require('../../modules/logger')
const Feeding = require('../../models/feeding')

const { transformData, dateToString } = require('./helpers')

module.exports.feeding = async (_, args, req) => {
  try {
    const feeding = await Feeding.find().sort({ createdAt: 'desc' })
    return feeding.map(f => ({
      ...transformData(f),
      startsFrom: dateToString(f.startsFrom)
    }))
  } catch (err) {
    logger(err)
  }
}

module.exports.addFeeding = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const dataSet = {
      weeks: args.feeding.weeks.map(w => ({
        days: w.days.map(d => ({
          meals: d.meals.map(m => ({
            timeStart: m.timeStart,
            timeEnd: m.timeEnd,
            menu: m.menu
          }))
        }))
      })),
      name: args.feeding.name,
      startsFrom: args.feeding.startsFrom
    }

    console.log(JSON.stringify(dataSet))

    const feeding = new Feeding(dataSet)
    feeding.markModified('weeks')

    const result = await feeding.save()
    return transformData(result)
  } catch (err) {
    logger(err)
  }
}

module.exports.removeFeeding = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    await Feeding.findByIdAndDelete(args.feedingId)
    return 'Deleted'
  } catch (err) {
    logger(err)
  }
}
