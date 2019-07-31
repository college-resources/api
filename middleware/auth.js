const { AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')
// const AuthenticationClient = require('auth0').AuthenticationClient

// Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
const secretProvider = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

const getSecret = async kid => new Promise((resolve, reject) => {
  secretProvider.getSigningKey(kid, (err, key) => {
    if (err) {
      reject(err)
    } else {
      const publicKey = key.publicKey || key.rsaPublicKey
      resolve(publicKey)
    }
  })
})

// Verify token using kid, audience and issuer
const verifyToken = async (token, dtoken) => jwt.verify(
  token,
  await getSecret(dtoken.header.kid),
  {
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  }
)

// TODO: Implement registration, user info
// const auth0 = new AuthenticationClient({
//   domain: process.env.AUTH0_DOMAIN
// })

// Used in resolvers to check if user is authenticated
// Throws AuthenticationError if user is unauthenticated
const checkAuthentication = req => () => {
  if (!req.user.isAuthenticated) {
    throw new AuthenticationError('Unauthorized')
  }
}

// Middleware function
const auth = async (req, res, next) => {
  let user = {}

  if (req.token) {
    try {
      // Decode JWT without verification to get kid from header
      // Error is thrown if decoding or verification fails
      const decoded = jwt.decode(req.token, { complete: true }) || {}
      await verifyToken(req.token, decoded)

      // Update user if JWT was valid
      if (decoded.payload && decoded.payload.sub) {
        user = decoded.payload
        user.isAuthenticated = true
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
    }
  }

  // Update req.user
  req.user = {
    ...user,
    checkAuthentication: checkAuthentication(req)
  }

  next()
}

module.exports = auth
