const logger = require('../../modules/logger')
const Preferences = require('../../models/preferences')
const User = require('../../models/user')

const { transformPreferences } = require('./helpers')

module.exports.preferences = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const result = await Preferences.findOne({ user: req.user.id })
    return transformPreferences(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}

module.exports.updatePreferences = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const request = {}

    if (args.preferences.feeding) {
      request.feeding = args.preferences.feeding
    }
    if (args.preferences.department) {
      request.department = args.preferences.department
    }
    if (args.preferences.semester) {
      request.semester = args.preferences.semester
    }
    if (args.preferences.courses) {
      request.courses = args.preferences.courses
    }
    if (args.preferences.theme) {
      request.theme = args.preferences.theme
    }

    let result = await Preferences.findOneAndUpdate(
      { user: req.user.id },
      { $set: request },
      { new: true }
    )

    if (!result) {
      const preferences = new Preferences({
        ...request,
        user: req.user.id
      })

      result = await preferences.save()

      await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { preferences: preferences._id } }
      )
    }

    req.loaders.preferences.prime(result.id, result)
    return transformPreferences(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}

module.exports.deletePreference = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const request = await Preferences.findOne(
      { user: req.user.id }
    )

    switch (args.preference) {
      case 'FEEDING':
        request.feeding = null
        break
      case 'DEPARTMENT':
        request.department = null
        break
      case 'SEMESTER':
        request.semester = null
        break
      case 'COURSES':
        request.courses = null
        break
      case 'THEME':
        request.theme = null
        break
    }

    let result = await Preferences.findOneAndUpdate(
      { user: req.user.id },
      { $set: request },
      { new: true }
    )

    req.loaders.preferences.prime(result.id, result)
    return transformPreferences(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}