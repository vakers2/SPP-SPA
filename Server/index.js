/* eslint-disable no-console */
'use strict'

const express = require('express')
const routes = require('./routes/index.js')
const fs = require('fs')
const formidable = require('formidable')
const userController = require('./controllers/users')
const jwt = require('jsonwebtoken')
const mongoose = require('./config/database')
var cors = require('cors')

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))

require('dotenv').config()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const liveReloadPort = 35729

app.use(cors())
app.set('view engine', 'ejs')
app.set('secretKey', 'asswecan')

app.use('/public', express.static(process.cwd() + '/public/'))
app.use('/files', express.static(process.cwd() + '/files/'))

var bodyParser = require('body-parser')
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}))

app.use(express.json())
app.use(express.urlencoded())

app.use(require('connect-livereload')({
    port: liveReloadPort
}))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, cache-control, x-access-token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    next()
})

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
        if (req.method == 'OPTIONS') {
            next()
        } else {
            if (err) {
                res.status(401).send({status: 'error', message: err.message})
            } else {
                req.body.userId = decoded.id
                next()
            }
        }
    })
}

app.use('/task', validateUser)

function readJsonFileSync(username)
{
    try {
        var file = fs.readFileSync('db.json', 'utf8')
        let tasks = JSON.parse(file)

        return tasks.filter(task => task.username == username)
    } catch (error) {
        return {message: 'No cards'}
    }
}

function addToJsonFile(jsonData){
    let tasks = []
    try {
        var file = fs.readFileSync('db.json', 'utf8')
        if (typeof jsonData.login != 'undefined') {
            tasks = JSON.parse(file).filter(task => task.username != jsonData.login)
        } else {
            tasks = JSON.parse(file).filter(task => task.username != jsonData[0].username)
        }
    } catch (error) {
        console.log('No cards')
    }
    if (typeof jsonData.login == 'undefined') {
        Array.prototype.push.apply(tasks, jsonData)
    }
    fs.writeFile('db.json', JSON.stringify(tasks), 'utf-8', function(err) {
        if (err) {
            console.log(err)
        }
    })
}

app.post('/signup', userController.create)
app.post('/login', userController.authenticate)

app.get('/', (request, response) => {
    response.render('pages/index', {data: readJsonFileSync()})
})

app.post('/task/files', (request, response) => {
    var form = new formidable.IncomingForm()
    form.parse(request, (err, fields, files) => {
        fs.readFile(files.file.path, (err, data) => {
            var path = process.cwd() + '/files/' + files.file.name
            fs.writeFile(path, data, function (err) {})
            response.send('http://localhost:3000/files/' + files.file.name)
        })
    })
})

io.on('connection', (client) => {
    client.on('get_cards', (user) => {
        client.emit('cards', readJsonFileSync(user) || [])
    })

    client.on('post_cards', (cards) => {
        addToJsonFile(cards)
    })
})

routes(app)

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on http://localhost:%d in %s mode.', port, app.get('env'))
})
