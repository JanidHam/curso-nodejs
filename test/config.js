const axios = require('axios')

const DB = require('../src/database')
const httpInstace = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
})

module.exports = {
  httpInstace,
  DB
}
