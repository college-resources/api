const jwksRsa = require('jwks-rsa')

// Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
module.exports.secretProvider = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})
