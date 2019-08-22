const { authenticationClient, userAuth } = require('./userAuth')

module.exports = async (req, res, next) => {
  req.auth = {
    authenticationClient
  }

  req.user = await userAuth(req)

  next()
}
