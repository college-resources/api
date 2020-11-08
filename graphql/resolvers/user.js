const logger = require('../../modules/logger')
const User = require('../../models/user')

const { transformUser } = require('./helpers')

module.exports.user = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    let user

    if (args.userId) {
      user = await User.findOne({ _id: args.userId })
    } else {
      user = req.user
    }

    return transformUser(req.loaders, user)
  } catch (err) {
    logger(err)
  }
}

module.exports.registerUser = async (_, args, req) => {
  try {
    await req.user.checkAuthentication({ ignoreRegistration: true })

    const user = new User({
      sub: req.user.sub,
      givenName: args.user.givenName,
      familyName: args.user.familyName,
      birthDate: args.user.birthDate && new Date(args.user.birthDate),
      picture: args.user.picture,
    })

    const result = await user.save()
    req.loaders.user.prime(result.id, result)
    return transformUser(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}
