const mongoose = require('mongoose')

const docSchema = mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 amount: {
  type: Number,
  required: true
 },
})

module.exports = mongoose.model('transactions', docSchema);