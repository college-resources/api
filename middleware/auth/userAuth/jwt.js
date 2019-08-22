const jwt = require('jsonwebtoken')

const { secretProvider } = require('./auth0')

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

module.exports.decodeToken = async token => {
  // Decode JWT without verification to get kid from header
  // Error is thrown if decoding or verification fails
  const decoded = jwt.decode(token, { complete: true }) || {}
  await verifyToken(token, decoded)

  return decoded
}
