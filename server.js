require('dotenv').config()

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

if (process.env.PORT) {
  process.env.SERVER_PORT = process.env.PORT
}
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const bearerToken = require('express-bearer-token')
const { ApolloServer } = require('apollo-server-express')

const apiRoutes = require('./routes')

const { typeDefs, resolvers } = require('./graphql')
const auth = require('./middleware/auth')
const loader = require('./middleware/loader')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req,
  debug: process.env.NODE_ENV === 'development',
  introspection: true,
  playground: {
    settings: {
      'request.credentials': 'include',
      'schema.polling.interval': 5000
    }
  }
})

const app = express()
app.use(morgan('dev', { stream: {
  write: msg => console.log(msg)
} }))
app.use(helmet())
app.use(cors({
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(bearerToken())
app.use(auth)
app.use(loader)

app.use('/api', apiRoutes)

server.applyMiddleware({ app })

module.exports = app
