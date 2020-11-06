const logger = require('../../modules/logger')
const Preference = require('../../models/preference')

const { transformPreference } = require('./helpers')

module.exports.preference = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    let preferences

    if (args.user) {
      preferences = await Preference.find({ user: args.user })
    } else {
      preferences = await Preference.find()
    }

    return preferences.map(transformPreference.bind(this, req.loaders))
  } catch (err) {
    logger(err)
  }
}

module.exports.addPreference = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const request = {}

    if (args.preference.feeding) {
      request.feeding = args.preference.feeding
    }
    if (args.preference.department) {
      request.department = args.preference.department
    }
    if (args.preference.semester) {
      request.semester = args.preference.semester
    }
    if (args.preference.courses) {
      request.courses = args.preference.courses
    }
    if (args.preference.theme) {
      request.theme = args.preference.theme
    }

    const result = await Preference.update(
      { user: req.user.id },
      { $set: request },
      { new: true }
    )
    // console.log(result._doc)
    // req.loaders.preference.prime(result.id, result)
    return transformPreference(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}
