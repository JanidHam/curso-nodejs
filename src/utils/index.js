'use strict'

const terminate = require('./terminate')
const cryptoUtils = require('./crypto')
const { getLogger, logHandler } = require('./logger')

module.exports = {
  getLogger,
  logHandler,
  terminate,
  cryptoUtils
}
