const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://vakers2:qwertyuiop322\!@mongospp-zanzi.gcp.mongodb.net/test?retryWrites=true'
mongoose.connect(mongoDB, {useNewUrlParser: true})
// mongoose.Promise = global.Promise

module.exports = mongoose