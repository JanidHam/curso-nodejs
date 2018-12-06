class ServerError extends Error {
  constructor(...args) {
    super(...args)
    this.name = this.constructor.name
    this.code = 500
    Error.captureStackTrace(this, ServerError)
  }
}

module.exports = ServerError
