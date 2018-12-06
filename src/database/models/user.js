/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose')

const { cryptoUtils, getLogger } = require('../../utils')

const log = getLogger(__dirname, __filename)

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  }
})

schema.pre('save', async function preSave() {
  try {
    this.password = await cryptoUtils.cryptText(this.password)
  } catch (err) {
    log.error(`Error al guardar al usuario: ${err.message}`)
  }
})

if (!schema.options.toObject) {
  schema.options.toObject = {}
}

schema.options.toObject.transform = (doc, ret) => {
  // eslint-disable-next-line no-param-reassign
  delete ret.__v

  return ret
}

module.exports = model('users', schema)
