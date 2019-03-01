const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://vakers_2:starwars13@mongospp-zanzi.gcp.mongodb.net/test?retryWrites=true'
mongoose.connect(mongoDB, {useNewUrlParser: true})
// mongoose.Promise = global.Promise

module.exports = mongoose
