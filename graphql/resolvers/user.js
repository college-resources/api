const { authenticationClient } = require('../../Auth0')

const User = require('../../models/user')

const { transformData, dateToString } = require('./helpers')

module.exports.user = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    let user

    if (args.userId) {
      user = await User.findOne({ _id: args.userId })
    } else {
      user = req.user
    }

    return transformData(user)
  } catch (err) {
    throw err
  }
}

module.exports.registerUser = async (_, args, req) => {
  try {
    await req.user.checkAuthentication({ ignoreRegistration: true })

    const auth0UserInfo = await authenticationClient.getProfile(req.token)

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
    return {
      ...transformData(result),
      birthDate: dateToString(result._doc.birthDate)
    }
  } catch (err) {
    throw err
  }
}
