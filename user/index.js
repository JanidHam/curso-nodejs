const { Router } = require('express')

const routes = new Router()

routes.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'from user file' })
})

routes.get('/:id([0-9]+)', (req, res) => {
  res.status(200).json({ message: 'user from file regular', id: req.params.id })
})

module.exports = routes
