require('dotenv').config()
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

const mongoose = require('mongoose')
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

mongoose.set('useCreateIndex', true)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req,
  debug: process.env.NODE_ENV === 'development',
  playground: process.env.NODE_ENV === 'development'
})

const app = express()
app.use(morgan('dev', { stream: {
  write: msg => console.log(msg)
}}))
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

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${
      process.env.MONGODB_CLUSTER
    }`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen({ port: process.env.SERVER_PORT }, () =>
      console.log(
        `Server ready at http://localhost:${process.env.SERVER_PORT}${
          server.graphqlPath
        }`,
        `NODE_ENV=${process.env.NODE_ENV}`
      )
    )
  })
  .catch(err => {
    console.log(err)
  })
