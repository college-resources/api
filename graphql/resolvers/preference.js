const logger = require('../../modules/logger')
const Preference = require('../../models/preference')

const { transformPreference } = require('./helpers')

module.exports.preference = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const result = await Preference.findOne({ user: req.user.id })
    return transformPreference(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}

module.exports.updatePreferences = async (_, args, req) => {
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

    let result = await Preference.findOneAndUpdate(
      { user: req.user.id },
      { $set: request },
      { new: true }
    )

    if (!result) {
      const preference = new Preference({
        ...request,
        user: req.user.id
      })

      result = await preference.save()
    }

    req.loaders.preference.prime(result.id, result)
    return transformPreference(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}
