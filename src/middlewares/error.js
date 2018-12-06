const { getLogger } = require('../utils')

const log = getLogger(__dirname, __filename)

const mErrorHandling = (err, req, res, next) => {
  if (!err) return next()

  try {
    const { id } = req
    const {
      message, stack, stacktrace, status
    } = err
    const code = status || 500
    const body = { message, error: true }

    if (process.env.NODE_ENV !== 'production') {
      body.stacktrace = stack || stacktrace || 'No stacktrace'
    }

    log.debug({ id, message: stack || stacktrace })
    log.error({ id, message })

    return res.status(code).json(body)
  } catch (error) {
    log.error({ message: `Error no controlado: ${error.message}` })

    return res.status(500)
      .json({
        message: 'Parece que no teníamos contemplado esto, prueba más tarde.',
        error: true
      })
  }
}

module.exports = mErrorHandling
