const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello world</h1>')
})

app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000')
})
