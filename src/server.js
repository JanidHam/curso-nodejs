const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const httpServer = require('http')

const { initApi } = require('./api')
const { mErrorHandling } = require('./middlewares')
const { getLogger, logHandler } = require('./utils')

class Server {
  constructor() {
    this.log = getLogger(__dirname, __filename)

    this.server = undefined
    this.app = express()
    this.PORT = process.env.PORT || 3000

    this.initApp()
  }

  initApp() {
    this.app
      .use(helmet())
      .use(cors())
      .use(express.urlencoded({ extended: false }))
      .use(express.json())
      .use(logHandler)
  }

  initServer() {
    return new Promise(async (resolve) => {
      await initApi(this.app)

      this.app.use(mErrorHandling)

      this.server = httpServer.createServer(this.app)
      this.server.listen(this.PORT)

      this.server.on('error', (err) => {
        this.log.error(`Error al iniciar el servidor: ${err.message}`)

        return resolve(false)
      })

      this.server.on('listening', () => {
        this.log.info(`Server listening on http://localhost:${this.PORT}`)

        return resolve(true)
      })
    })
  }

  stopServer() {
    if (this.server) {
      this.log.info(this.server.listening)

      this.server.close()

      this.server.on('close', () => {
        this.log.info('Server is close')
      })
    }
  }
}

module.exports = Server
