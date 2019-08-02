const { AuthenticationClient } = require('auth0')

module.exports.authenticationClient = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN
})
