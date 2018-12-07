const express = require('express')
const MongoClient = require('mongodb').MongoClient

const userRoutes = require('./user')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const MONGO_URL = `mongodb://curso:cursonode1@ds127644.mlab.com:27644/curso-nodejs`

const client = new MongoClient(MONGO_URL, { useNewUrlParser: true })

// Use connect method to connect to the Server
client.connect(function(err) {
  if (err) return console.log(err.message)

  console.log("Connected successfully to server")

  const db = client.db()
})



app.get('/user', (req, res) => {
  const user = client.db().collection('user')
  user.find().toArray()
    .then((users) => {
      res.status(200).json({ users })
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

app.post('/user', (req, res) => {
  const { name } = req.body
  const user = client.db().collection('user')
  user.insertOne({ name })
    .then((inserted) => {
      res.status(200).json({ inserted })
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

// app.use('/user', userRoutes)

app.get('*', (req, res) => {
  res.status(404).send('<h1>No encontramos lo que buscabas</h1>')
})

app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000')
})
