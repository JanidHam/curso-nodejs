const path = require('path')
const glob = require('glob')
const { promisify } = require('util')
const { getLogger } = require('../utils')

const globRead = promisify(glob)
const log = getLogger(__dirname, __filename)

module.exports = {
  initApi: (app) => globRead('./src/api/**/*.js')
    .then(files => {
      files.forEach(file => {
        const route = file.replace('./src/api/', '')
        const fileName = route.replace('.js', '')

        if (fileName === 'index') return

        const pathFile = path.resolve(__dirname, fileName)
        // eslint-disable-next-line global-require
        const router = require(pathFile)

        app.use(`/api/${fileName}`, router)
        log.info(`API found @api/${fileName}`)
      })
    })
}
