/* eslint-disable class-methods-use-this */
const { Router } = require('express')

const DB = require('../database')
const { ServerError, NotFound } = require('../errors')

class User {
  constructor() {
    this.router = new Router()

    this.initRoutes()
  }

  async getUsers(req, res, next) {
    try {
      const users = await DB.models.User.find()

      return res.status(200).json({ users: users.map(user => user.toObject()) })
    } catch (error) {
      return next(error)
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params
      const user = await DB.models.User.findById(id)

      if (!user) {
        return next(new NotFound(`No se encontró al usuario con id: ${id}`))
      }

      return res.status(200).json({ user: user.toObject() })
    } catch (error) {
      return next(error)
    }
  }

  async patchUser(req, res, next) {
    try {
      const { id } = req.params
      const updated = await DB.models.User.updateOne({ _id: id }, req.body)

      if (!updated) {
        return next(new NotFound(`No se encontró al usuario con id: ${id}`))
      }

      const user = await DB.models.User.findById(id)

      return res.status(200).json({ user: user.toObject() })
    } catch (error) {
      return next(error)
    }
  }

  async insertUser(req, res, next) {
    try {
      const { body } = req
      const user = new DB.models.User(body)

      const saved = await user.save()

      if (!saved) {
        return next(new ServerError('Hubo un error al crear el usuario'))
      }

      return res.status(201).json({ user: saved.toObject() })
    } catch (error) {
      return next(error)
    }
  }

  initRoutes() {
    this.router.get('/', this.getUsers)
    this.router.get('/:id', this.getUser)

    this.router.patch('/:id', this.patchUser)
    this.router.post('/', this.insertUser)
  }

  getRouter() {
    return this.router
  }
}

const user = new User()
const router = user.getRouter()

module.exports = router
