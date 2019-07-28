require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs, resolvers } = require('./graphql')

mongoose.set('useCreateIndex', true)

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => req })

const app = express()

// TODO: jwt middleware
app.use((req, res, next) => {
  req.user = {
    checkAuthentication: () => { }
  }

  next()
})

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
      console.log(`Server ready at http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`)
    )
  })
  .catch(err => {
    console.log(err)
  })
