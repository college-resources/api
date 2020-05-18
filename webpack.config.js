const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './server.js',
  target: 'node',
  module: {
    rules: [
      {
        test: require.resolve('./graphql/schema'),
        use: [{ loader: 'val-loader' }]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: { ecma: 6 }
      })
    ]
  },
  watchOptions: {
    ignored: ['dist/**', 'node_modules/**']
  }
}
