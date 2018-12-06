const express = require('express')

const app = express()

app.get('*', (req, res) => {
  res.status(404).send('<h1>No encontramos lo que buscabas</h1>')
})

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello world</h1>')
})

app.get('/user', (req, res) => {
  res.status(200).json({ message: 'Hello user' })
})



app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000')
})
