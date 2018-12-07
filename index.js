const express = require('express')
const userRoutes = require('./user')

const app = express()

// app.get('*', (req, res) => {
//   res.status(404).send('<h1>No encontramos lo que buscabas</h1>')
// })

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello world</h1>')
})

app.use('/user', userRoutes)

// app.get('/user', (req, res) => {
//   res.status(200).json({ message: 'Hello user' })
// })

// app.get('/user/:id([0-9]+)', (req, res) => {
//   res.status(200).json({ message: 'user regular', id: req.params.id })
// })

// app.get(/user\/:userId([0-9]+)$/, (req, res) => {
//   res.status(200).json({ message: 'regular 2', id: req.params.userId })
// })

app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000')
})
