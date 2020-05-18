const path = require('path')
const { importSchema } = require('graphql-import')
const { gql } = require('apollo-server-express')

module.exports = (options, loaderContext) => {
  const schema = importSchema(path.join(__dirname, './schema.graphql'))
  const ast = gql`${schema}`
  const astString = JSON.stringify(ast)

  return { code: `module.exports = ${astString}` }
}
