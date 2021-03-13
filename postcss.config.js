/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer')
const calc = require('postcss-calc')
const atImport = require('postcss-import')

module.exports = {
  plugins: [autoprefixer, atImport, calc({ preserve: true })],
}
