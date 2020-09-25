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
