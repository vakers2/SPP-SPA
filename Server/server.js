const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const users = require('./src/routes/users')
const todos = require('./src/controllers/todos')
const mongoose = require('./src/config/database')

const PORT = process.env.PORT || 3001

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
app.set('secretKey', 'todoapp')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/users', users)

app.use((req, res) => {
  res.status(404).send('Nope, nothing here')
})

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`)
})
