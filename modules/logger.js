const { AuthenticationError } = require('apollo-server-express')

module.exports = err => {
  if (err instanceof AuthenticationError) {
    throw err
  }

  if (process.env.NODE_ENV === 'development') {
    console.trace(err)
  } else {
    console.log(err.message)
  }
}
