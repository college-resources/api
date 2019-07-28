const path = require('path')

const { importSchema } = require('graphql-import')

exports.typeDefs = importSchema(path.join(__dirname, 'schema/schema.graphql'))

const resolvers = require('./resolvers')

exports.resolvers = resolvers
