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

    return transformUser(user)
  } catch (err) {
    throw err
  }
}

module.exports.registerUser = async (_, args, req) => {
  try {
    await req.user.checkAuthentication({ ignoreRegistration: true })

    const auth0UserInfo = await req.auth.authenticationClient.getProfile(req.token)

    const user = new User({
      sub: auth0UserInfo.sub,
      email: auth0UserInfo.email,
      emailVerified: auth0UserInfo.email_verified,
      name: args.user.name,
      givenName: args.user.givenName,
      familyName: args.user.familyName,
      middleName: args.user.middleName,
      nickname: args.user.nickname,
      gender: args.user.gender,
      birthDate: new Date(args.user.birthDate),
      picture: args.user.picture
    })

    const result = await user.save()
    req.loaders.user.prime(result.id, result)
    return transformUser(result)
  } catch (err) {
    throw err
  }
}
