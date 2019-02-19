const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://vakers2:@mongospp-zanzi.gcp.mongodb.net/spp?retryWrites=true'
mongoose.connect(mongoDB, {useNewUrlParser: true})
// mongoose.Promise = global.Promise

module.exports = mongoose
