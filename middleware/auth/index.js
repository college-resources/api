const { userAuth } = require('./userAuth')

module.exports = async (req, res, next) => {
  // TODO: Rewrite to prevent race condition
  req.user = await userAuth(req) // eslint-disable-line

  next()
}
