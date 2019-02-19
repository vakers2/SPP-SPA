const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const CardSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 250
  },
  status: {
    type: String,
    trim: true,
    required: true,
    enum: [
      'Not started',
      'In progress',
      'Finished'
    ]
  },
  createdAt: Date
})

TodoSchema.pre('save', function (next) {
  this.createdAt = moment()
  next()
})

module.exports = mongoose.model('Card', CardSchema)