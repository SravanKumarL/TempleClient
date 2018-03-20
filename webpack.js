
'use strict'

const path = require('path')

module.exports = {
  entry: ["babel-polyfill",path.join(__dirname, 'server/index.js')],

  output: {
    publicPath: '/build/',
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js'
  },
  devtool: 'source-map'
}
