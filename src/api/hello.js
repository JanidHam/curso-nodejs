const { Router } = require('express')

const router = new Router()

const hello = (req, res) => {
  return res.status(200).json({ message: 'Hello world!' })
}

const crash = (req, res) => {
  return res.status(200).json({ message: 'Crash 🚀 BOOM 💥!!!!!' })
}

router.get('/', hello)
router.get('/crash', crash)

module.exports = router
