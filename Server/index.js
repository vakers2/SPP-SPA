'use strict'

const express = require('express')
const routes = require('./routes/index.js')
const fs = require('fs')
const formidable = require('formidable')
const userController = require('./controllers/users')
const mongoose = require('./config/database')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const liveReloadPort = 35729

app.set('view engine', 'ejs')

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
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, cache-control, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next()
})

function readJsonFileSync(){
    var file = fs.readFileSync('db.json', 'utf8')

    return JSON.parse(file)
}

function addToJsonFile(jsonData){
    fs.writeFile('db.json', JSON.stringify(jsonData), 'utf-8', function(err) {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(err)
        }
    })
}

app.post('/signup', userController.create)
app.post('/login', userController.authenticate)

app.get('/', (request, response) => {
    response.render('pages/index', {data: readJsonFileSync()})
})

app.get('/getTasks', (request, response) => {
    response.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.header('Pragma', 'no-cache')
    response.header('Expires', 0)
    response.send(readJsonFileSync())
})

app.post('/files', (request, response) => {
    var form = new formidable.IncomingForm()
    form.parse(request, (err, fields, files) => {
        fs.readFile(files.file.path, (err, data) => {
            var path = process.cwd() + '/files/' + files.file.name
            fs.writeFile(path, data, function (err) {})
            response.send('http://localhost:3000/files/' + files.file.name)
        })
    })
})

app.post('/task', (request, response) => {
    addToJsonFile(request.body)
    response.sendStatus(200)
})

routes(app)

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on http://localhost:%d in %s mode.', port, app.get('env'))
})
