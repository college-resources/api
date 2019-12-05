const { AuthenticationError } = require('apollo-server-express')

const User = require('../../../models/user')
const { decodeToken } = require('./jwt')
const userAuth = async req => {
  // Check database for user and update req.user
  const updateReqUser = async () => {
    const dbUser = await User.findOne({ sub: req.user.sub })
    if (dbUser) {
      Object.keys(dbUser).forEach(key => {
        req.user[key] = dbUser[key]
      })

      // TODO: Rewrite to prevent race condition
      req.user.id = dbUser.id // eslint-disable-line
      req.user.isRegistered = true // eslint-disable-line
    }
  }

  // Used in resolvers to check if user is authenticated
  // Throws AuthenticationError if user is unauthenticated or unregistered
  const checkAuthentication = async (options = {}) => {
    if (!req.user.isAuthenticated) {
      throw new AuthenticationError('Unauthenticated')
    }

    if (!options.ignoreRegistration) {
      await updateReqUser(req)
      if (!req.user.isRegistered) {
        throw new AuthenticationError('Unregistered')
      }
    }
  }

  let user = {}

  if (req.token) {
    try {
      const decoded = await decodeToken(req.token)
      // Update user if JWT was valid
      if (decoded.payload && decoded.payload.sub) {
        user = {
          ...decoded.payload,
          isAuthenticated: true
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
    }
  }

  return {
    ...user,
    checkAuthentication
  }
}

module.exports = { userAuth }
