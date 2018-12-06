const bcrypt = require('bcrypt-nodejs')

const cryptText = (text) => {
  return new Promise((resolve, reject) => {
    if (!text) return reject(new Error('Params not to be null'))

    return bcrypt.hash(text, null, null, (err, hash) => {
      if (err) return reject(err)

      return resolve(hash)
    })
  })
}

const compareText = (text, textCrypted) => {
  return new Promise((resolve, reject) => {
    if (!text) return reject(new Error('Text to be null'))
    if (!textCrypted) return reject(new Error('TextCrypted not to be null'))

    return bcrypt.compare(text, textCrypted, (err, match) => {
      if (err) return reject(err)

      return resolve(match)
    })
  })
}

module.exports = {
  cryptText,
  compareText
}
