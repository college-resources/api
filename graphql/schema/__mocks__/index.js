const path = require('path')
const { importSchema } = require('graphql-import')
const { gql } = require('apollo-server-express')

const schema = importSchema(path.join(__dirname, '../schema.graphql'))
const ast = gql`${schema}`

module.exports = ast
