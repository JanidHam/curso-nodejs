const mongoose = require('mongoose')

const config = require('./config')
const { User } = require('./models')

const initDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.MONGO_URL, { useNewUrlParser: true }, (err) => {
      if (err) return reject(err)

      return resolve(true)
    });
  })
}

const onConnected = (cb) => {
  mongoose.connection.once('open', cb)
}

const onError = (cb) => {
  mongoose.connection.on('error', (err) => cb(err))
}

const closeDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.close((err) => {
      if (err) return reject(err)

      return resolve(true)
    })
  })
}

module.exports = {
  initDB,
  onError,
  closeDB,
  onConnected,
  models: {
    User
  }
}
