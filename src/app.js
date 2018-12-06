const DB = require('./database')
const Server = require('./server')
const { getLogger, terminate } = require('./utils')

const log = getLogger(__dirname, __filename)
const server = new Server()

let reconectionTime = 3000
let maxReconnections = process.env.DB_INTENT_RECONECTIONS || 3

DB.initDB().then(() => {
  server.initServer()
    .then()
    .catch(terminate(1, 'Error al iniciar el servicio'))
})

DB.onError((err) => {
  log.error(`Error al conectarse a la base de datos: ${err.message}`)

  if (maxReconnections === 0) {
    log.info('Máximo de intentos alcanzados al tratar de conectarse a la DB.')
    return terminate(1, 'Máximo de intentos alcanzados al tratar de conectarse a la DB.')
  }

  maxReconnections -= 1

  log.info(`Reconectando a la base de datos en ${reconectionTime / 1000} segundos...`)

  setTimeout(() => {
    DB.initDB()
  }, reconectionTime)

  reconectionTime += 2000

  return null
})

process.on('SIGINT', terminate(0, 'SIGINT'))
process.on('SIGTERM', terminate(0, 'SIGTERM'))
process.on('uncaughtException', terminate(1, 'uncaughtException'))
process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
