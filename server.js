require('dotenv').config()
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

const mongoose = require('mongoose')
const express = require('express')
const bearerToken = require('express-bearer-token')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs, resolvers } = require('./graphql')
const auth = require('./middleware/auth')

mongoose.set('useCreateIndex', true)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req,
  debug: process.env.NODE_ENV === 'development',
  playground: process.env.NODE_ENV === 'development'
})

const app = express()

app.use(bearerToken())
app.use(auth)

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
